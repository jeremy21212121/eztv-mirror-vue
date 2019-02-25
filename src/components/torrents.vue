<template>
        <div>
            <ol
                v-if="loading"
            >
                <Placeholder
                    v-for="n in this.keyArray"
                    :key="n"
                    
                />
            </ol>
            <ol
                v-else
            >
                <Torrent
                    v-for="torrent in torrents" 
                    :key="torrent.id" 
                    :title="torrent.title" 
                    :magnet_url="torrent.magnet_url"
                    :size_bytes="torrent.size_bytes"
                    :date_released_unix="torrent.date_released_unix"
                    :seeds="torrent.seeds"
                    :peers="torrent.peers"
                    :imdb="torrent.imdb_id"
                />
            </ol>
        </div>
</template>

<script>
import Torrent from './torrent.vue';
import Placeholder from './placeholder.vue'
export default {
    name: 'Torrents',
    data: function() {
        return {
            keyArray: Array.from(Array(this.limit).keys()).map(n=>n+1)
        }
    },
    props: {
        torrents: Array,
        loading: Boolean,
        limit: Number
    },
    components: {
        Torrent,
        Placeholder
    }

}
</script>

<style scoped>
ol {
    padding-inline-start: 0;
    max-width: 1280px;
    margin: 0 auto;
}
</style>
