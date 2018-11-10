<template>
    <li class="leader">
        <h2 class="leader__title">{{ leaderName }}</h2>

        <div class="metaContainer">
            <progressive-img class="leader__image" :src="leaderImage" />

            <p class="comment">{{ authorComment }}</p>

            <p class="author">Автор: {{ authorName }}</p>
        </div>
    </li>
</template>

<script>
export default {
    name: "Leader",
    props: {
        leaderName: {
            type: String,
            required: true,
        },
        leaderImage: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: true,
        },
        authorComment: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped>
.leader {
    margin: 0 .75em 1.5em;
    padding: 2em;
    display: inline-block;
    border-radius: 67px 24px 30px 30px / 43px 127px 34px 52px;
    background-image: linear-gradient(to bottom, deeppink 0%, darkblue 50%, deeppink 100%);
    background-image: conic-gradient(deeppink 0%, darkblue 50%, deeppink 100%);
    box-shadow: 0 3px 15px rgba(0,0,0,.5); 
    color: #f7f7f7;
}

.leader__title {
    margin-top: .4em;
    text-align: left;
}

.leader__image {
    
}
.author {
    text-align: right;
    transform: translateY(1em);
    margin-bottom: 2em;
}
</style>