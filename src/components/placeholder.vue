<template>
    <li
        
    >
    </li>
</template>

<script>
export default {
    name: "Placeholder",
    // data: function() {
    //     return {
    //         placeholderArray: Array.from(Array(this.limit).keys())
    //     }
    // },
    props: {
        //limit: Number
    },
    created: function() {

    },
    methods: {

    }
}
</script>
<style scoped>
li {
    list-style-type: none;
    display: flex;
    height: 2em;
    margin: 4px 0px;
    border: 1px solid #666;
    border-radius: 3px;
    align-items: center;
    background-color: rgb(255,255,255);
    opacity: 0.1;
    /* transition: opacity 1s ease; */
    animation: flash 2s infinite ease-in-out;
}
@keyframes flash {
    0% {
        /* background-color: rgba(255,255,255,0.1); */
        opacity: 0.05;
    }
    50% {
        /* background-color: rgba(255,255,255,0.2); */
        opacity: 0.15;
    }
    100% {
        /* background-color: rgba(255,255,255,0.1); */
        opacity: 0.05;
    }
}
</style>

