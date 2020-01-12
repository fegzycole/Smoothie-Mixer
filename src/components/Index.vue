<template>
  <div class="big-container">
    <Spinner v-if="showSpinner"/>
    <div class="index container">
      <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card-content">
          <i class="material-icons delete"
          @click="deleteSmoothie(smoothie.id)">delete</i>
          <h2 class="indigo-text">{{ smoothie.title }}</h2>
          <ul class="ingredients">
            <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ ingredient }}</span>
            </li>
          </ul>
        </div>
        <span class="btn-floating btn-large halfway-fab pink">
          <router-link 
          :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug} }">
          <i class="material-icons">edit</i>
          </router-link>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
import Spinner from './Spinner'
import db from '@/firebase/init'

export default {
  name: 'Index',
  components: {
    Spinner
  },
  data () {
    return {
      smoothies: [
      ],
      showSpinner: false
    }
  },
  methods: {
    deleteSmoothie(id) {
      this.showSpinner = true
      db.collection('smoothie').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id !== id
        })
        this.showSpinner = false
      })
    }
  },
  created() {
    this.showSpinner = true
    db.collection('smoothie').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
      this.showSpinner = false
    })
  }
}
</script>

<style>
.index {
  margin-top: 60px;
}

.index .card {
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

@media screen and (min-width: 500px) {
  .index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }

  .index .card {
    margin-top: 0;
  }
}

@media screen and (min-width: 700px) {
  .index {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
