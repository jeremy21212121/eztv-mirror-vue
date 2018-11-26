<style scoped>
div.wrapper {
    opacity: 0;
    max-width: 0px;
    transition: all 500ms ease;
    overflow: hidden;
    display: inline-block;
    position: relative;
    top: 28px;
    
}
@media screen and (min-width: 1080px) {
    div.wrapper {
        max-width: 100%;
        opacity: 1;
    }
    
}
span#error-msg {
    display: inline-block;
    line-height: 5.5em;
    background-color: rgba(255,255,255,0.7);
    border-radius: 8px;
    color: black;
    width:250px;
    margin-left:40px;
}
#triangle {
    position: absolute;
    top: 40px;
    display: inline-block;
    width: 0; 
    height: 0; 
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent; 

    border-right:40px solid rgba(255,255,255,0.7);
}
</style>


<template>
    <div class="wrapper">
        <div id="triangle">
        </div>
        <span id="error-msg">
            {{msg}}
        </span>
    </div>
</template>


<script>
export default {
    name: 'Speechbubble',
    props: {
        msg: String
    }
}
</script>
