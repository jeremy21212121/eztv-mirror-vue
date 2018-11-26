<template>
    <div>
        <p>
            <span>Error:</span> {{msg}}
        </p>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        justify-content: center
    }
    p {
        /* margin: 20px 5%; */
        width: 90%;
        max-width: 720px;
        background-color: rgba(255,255,255,0.5);
        color: black;
        border-radius: 3px;
        line-height: 3em;
    }
    span {
        font-weight: bold;
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

