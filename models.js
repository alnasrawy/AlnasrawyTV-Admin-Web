/**
 * Data Models for Alnasrawy TV Web Admin
 * Unified with Android Core :core Models
 */

/**
 * @typedef {Object} FSource
 * @property {string} name
 * @property {string} label
 * @property {string} url
 * @property {string} type - hls, mp4, ts
 * @property {boolean} isDirect
 * @property {number} orderIndex
 */

/**
 * @typedef {Object} FMovie
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} logoUrl
 * @property {string} backdropUrl
 * @property {string} year
 * @property {string} rating
 * @property {string} genre
 * @property {number} orderIndex
 * @property {Array<FSource>} servers
 * @property {Object.<string, FSource>} sources
 */

/**
 * @typedef {Object} FSeries
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} logoUrl
 * @property {string} backdropUrl
 * @property {string} year
 * @property {string} rating
 * @property {string} genre
 * @property {number} orderIndex
 * @property {Object.<string, FSeason>} seasons
 */

/**
 * @typedef {Object} FSeason
 * @property {string} id
 * @property {string} name
 * @property {number} orderIndex
 * @property {Object.<string, FEpisode>} episodes
 */

/**
 * @typedef {Object} FEpisode
 * @property {string} id
 * @property {string} title
 * @property {number} orderIndex
 * @property {string} logoUrl
 * @property {Array<FSource>} servers
 */

/**
 * @typedef {Object} AppConfig
 * @property {string} adminPin
 * @property {string} matchesUrl
 * @property {Object} liveConfig
 * @property {Object} moviesConfig
 * @property {Object} seriesConfig
 * @property {Object} userAppUpdate
 * @property {Object} adminAppUpdate
 */
