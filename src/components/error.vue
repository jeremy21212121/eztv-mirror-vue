<template>
    <div>
        <p>
            <span>Error:</span> {{msg}}
        </p>
        <button @click.prevent="$emit('clear-error')" class="close" title="Dismiss error"><span>X</span></button>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        justify-content: center;
        width: 90%;
        max-width: 720px;
        background-color: rgba(255,255,255,0.5);
        border-radius: 3px;
        margin: 16px auto;
    }
    p {
        /* margin: 20px 5%; */
        /* width: 90%;
        max-width: 720px; */
        /* background-color: rgba(255,255,255,0.5); */
        color: black;
        /* border-radius: 3px; */
        line-height: 3em;
    }
    span {
        font-weight: bold;
    }
    button.close {
        position: relative;
        top: 8px;
        left: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        color: black;
        height: 24px;
        width: 24px;
        text-align: left;
        border: 1px solid rgba(255,255,255,0.8);
        border-radius: 15%;
    }
</style>

<script>
export default {
    name: "Error",
    props: {
        msg: String
    }
}
</script>

