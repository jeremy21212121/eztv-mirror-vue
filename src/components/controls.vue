<template>
    <nav>
        <button
            v-show="pageNumber > 1"
            @click="pageNumber--"
            title="Previous page"
        >
        &lt;
        </button>    
        <span title="Current page">
            {{pageNumber}}
        </span>
        <button
            v-show="pageNumber < 50"
            @click="pageNumber++"
            title="Next page"
            
        >
        &gt;
        </button>
    
    </nav>
</template>

<style scoped>
nav {
    font-size: 1.8em;
    display: flex;
    justify-content: center;
}
button {
    line-height: 2em;
    width: 3em;
    /* font-size: 2em; */
}
span {
    margin: 0 8px;
}
</style>


<script>
export default {
    name: 'Controls',
    data: function() {
        return {
            pageNumber: this.page
            // limitData: this.limit
        }
    },
    props: {
        page: Number
        // limit: Number
    },
    watch: {
        pageNumber: function(val) {
            this.$emit('input',val)
        }
    }
}
</script>

