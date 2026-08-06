/**
 * Firebase Database Nodes - Unified with Android Core
 */
const FirebaseNodes = {
    APP_CONFIG: "app_config",

    // Live TV
    NETWORKS: "networks",
    CHANNELS: "channels",

    // VOD - Movies
    MOVIES_CATEGORIES: "movies_categories",
    MOVIES: "movies",

    // VOD - Series
    SERIES_CATEGORIES: "series_categories",
    SERIES: "series",
    SEASONS: "seasons",
    EPISODES: "episodes",

    // Infrastructure
    XTREAM_SERVERS: "xtream_servers",
    SOURCES: "sources",
    NOTIFICATIONS: "global_notifications"
};

if (typeof module !== 'undefined') {
    module.exports = FirebaseNodes;
}
