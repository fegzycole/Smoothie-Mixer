<template>
  <div class="big-container">
    <Spinner v-if="showSpinner"/>
    <div class="add-smoothie container">
      <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
      <form @submit.prevent="addSmoothie">
        <div class="field title">
          <label for="title">Smoothie Title</label>
          <input type="text" name="title" v-model="title">
        </div>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add An Ingredient</label>
          <input type="text" name="add-ingredient"
          @keydown.tab.prevent="addIng" v-model="another">
        </div>
        <div class="center-align">
          <p class="red-text" v-show="feedback">{{ feedback }}</p>
          <button class="btn pink">Add Smoothie</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import slugify from 'slugify'
import Spinner from './Spinner'
import db from '@/firebase/init'

export default {
  name: 'AddSmoothie',
  components: {
    Spinner,
  },
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null,
      showSpinner: false
    }
  },
  methods: {
    async addSmoothie() {
      if(this.title) {
        this.showSpinner = true
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true
        })
        try {
          await db.collection('smoothie').add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          this.showSpinner = false
          this.$router.push({ name: 'Index' })
        } catch(error) {
          this.showSpinner = false
          console.log(error)
        }
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIng() {
      if(this.another) {
        this.feedback = null
        this.ingredients.push(this.another)
        this.another = null
      } else {
        this.feedback = 'You must enter a value to an ingredient'
      }
    },
    deleteIng(ingredient) {
      this.ingredients = this.ingredients.filter(ing => ing !== ingredient)
    }
  }
}
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
  z-index: 100;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>