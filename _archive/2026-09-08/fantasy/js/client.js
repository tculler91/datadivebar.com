/* fantasy/js/client.js
   Global Supabase client + shared helpers for Data Dive Fantasy Baseball.
   Load AFTER the Supabase UMD CDN script. Exposes window.FA. */

;(function () {
  'use strict'

  const SUPABASE_URL = 'https://lfxfutgrgzygqnwdeyby.supabase.co'
  const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmeGZ1dGdyZ3p5Z3Fud2RleWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjQ5MzAsImV4cCI6MjA4NzgwMDkzMH0.xBWGRbrBloOZgUqIpnd-aHC89MgqBAZhZkx57u3FwQo'

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

  const FA = {
    sb,

    // ─── Auth ───────────────────────────────────────────────────────────────

    async getSession() {
      const {
        data: { session },
      } = await sb.auth.getSession()
      return session
    },

    /** Redirect to auth if no active session. Returns session or null. */
    async requireAuth(redirect = 'auth.html') {
      const session = await this.getSession()
      if (!session) {
        window.location.replace(redirect)
        return null
      }
      return session
    },

    async signOut() {
      await sb.auth.signOut()
      window.location.replace('auth.html')
    },

    // ─── Profiles ────────────────────────────────────────────────────────────

    async getProfile(userId) {
      const { data, error } = await sb
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) throw error
      return data
    },

    async updateProfile(userId, updates) {
      const { data, error } = await sb
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      if (error) throw error
      return data
    },

    async checkUsernameAvailable(username) {
      const { data } = await sb
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle()
      return data === null
    },

    // ─── Leagues ─────────────────────────────────────────────────────────────

    /** Returns the most-recent league+membership for a user, or null. */
    async getUserLeague(userId) {
      const { data, error } = await sb
        .from('league_members')
        .select('*, leagues(*)')
        .eq('user_id', userId)
        .order('joined_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      if (error) throw error
      return data
    },

    async getLeagueMembers(leagueId) {
      const { data, error } = await sb
        .from('league_members')
        .select('*, profiles(username, avatar_color)')
        .eq('league_id', leagueId)
        .order('draft_position', { ascending: true })
      if (error) throw error
      return data
    },

    async getLeagueByInviteCode(code) {
      const { data, error } = await sb
        .from('leagues')
        .select('*')
        .eq('invite_code', code.toUpperCase().trim())
        .single()
      if (error) throw error
      return data
    },

    // ─── Utilities ───────────────────────────────────────────────────────────

    /** Generate a 6-char alphanumeric invite code (no ambiguous chars). */
    generateInviteCode() {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      let code = ''
      for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)]
      }
      return code
    },

    /** First 1–2 letters of a name, uppercased, for avatar initials. */
    getInitials(name) {
      if (!name) return '?'
      return name
        .split(/[\s_]/)
        .map((w) => w[0] || '')
        .join('')
        .toUpperCase()
        .slice(0, 2)
    },

    /** Human-readable relative time ("2h ago", "just now"). */
    timeAgo(isoString) {
      const diff = Date.now() - new Date(isoString).getTime()
      const m = Math.floor(diff / 60000)
      if (m < 1) return 'just now'
      if (m < 60) return `${m}m ago`
      const h = Math.floor(m / 60)
      if (h < 24) return `${h}h ago`
      return `${Math.floor(h / 24)}d ago`
    },
  }

  window.FA = FA
})()
