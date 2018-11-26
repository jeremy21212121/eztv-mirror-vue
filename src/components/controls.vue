<template>
    <nav>
        <button
            v-if="pageNumber > 1"
            @click="pageNumber--"
            title="Previous page"
        >
        &lt;
        </button>    
        <span title="Current page">
            {{pageNumber}}
        </span>
        <button
            v-if="pageNumber < 50"
            @click="pageNumber++"
            title="Next page"
            
        >
        &gt;
        </button>
    
    </nav>
</template>

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

