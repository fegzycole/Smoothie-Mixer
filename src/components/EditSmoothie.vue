<template>
  <div class="big-container">
    <Spinner v-if="showSpinner"/>
    <div v-if="smoothie" class="edit-smoothie container">
      <h2 class="center-align">Edit {{ smoothie.title }}</h2>
      <form @submit.prevent="editSmoothie">
        <div class="field title">
          <label for="title">Smoothie Title</label>
          <input type="text" name="title" v-model="smoothie.title">
        </div>
        <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add An Ingredient</label>
          <input type="text" name="add-ingredient"
          @keydown.tab.prevent="addIng" v-model="another">
        </div>
        <div class="center-align">
          <p class="red-text" v-show="feedback">{{ feedback }}</p>
          <button class="btn pink">Update Smoothie</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import slugify from 'slugify'
import Spinner from './Spinner'
import db from '@/firebase/init';

export default {
  name: 'EditSmoothie',
  components: {
    Spinner
  },
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
      showSpinner: false
    }
  },
  methods: {
    deleteIng(ingredient) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => ing !== ingredient)
    },
    addIng() {
      if(this.another) {
        this.feedback = null
        this.smoothie.ingredients.push(this.another)
        this.another = null
      } else {
        this.feedback = 'You must enter a value to an ingredient'
      }
    },
    async editSmoothie() {
      if(this.smoothie.title) {
        this.showSpinner = true
        this.feedback = null
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true
        })
        try {
          await db.collection('smoothie').doc(this.smoothie.id).update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
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
    }
  },
  async created() {
    this.showSpinner = true
    let response = await db
      .collection('smoothie')
      .where('slug', '==', this.$route.params.smoothie_slug)
      .get()
    response.forEach(doc => {
      this.smoothie = doc.data()
      this.smoothie.id = doc.id
    })
    this.showSpinner = false
  }
}
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
