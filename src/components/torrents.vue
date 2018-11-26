<template>
    <ol>
        <Torrent
            v-for="torrent in torrents" 
            :key="torrent.id" 
            :title="torrent.title" 
            :magnet_url="torrent.magnet_url"
            :size_bytes="torrent.size_bytes"
            :date_released_unix="torrent.date_released_unix"
            :seeds="torrent.seeds"
            :peers="torrent.peers"
        />
    </ol>
</template>

<script>
import Torrent from './torrent.vue';
export default {
    name: 'Torrents',
    props: {
        torrents: Array
    },
    components: {Torrent}

}
</script>

<style scoped>
ol {
    padding-inline-start: 0;
}
</style>
