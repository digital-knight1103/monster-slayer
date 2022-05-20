//If we are not using any data from the VUE we can write JavaScript code here and refer to it in our VUE
const getRandomAttack = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}



const app = Vue.createApp({
  data() {

    return{
      witcherHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    }
  },
  methods: {
    weAttackMonster() {
      this.currentRound++
      //caltulate our attack about 20-10 power
      const attackValue = getRandomAttack(8,16)
      this.monsterHealth = this.monsterHealth - attackValue
      // after our attack time to monsterAttack
      this.mosterAttackTheWitcher()
    },
    mosterAttackTheWitcher() {
      const attackValue = getRandomAttack(6,18)
      this.witcherHealth = this.witcherHealth - attackValue
    },
    specialAttack() {
      this.currentRound++
      const specialAttackValue = getRandomAttack(10,25)
      this.monsterHealth =  this.monsterHealth - specialAttackValue
      this.mosterAttackTheWitcher()
    },
    healWitcher() {
      this.currentRound++
      const healValue = getRandomAttack(8,20);
      if(this.witcherHealth + healValue > 100) {
        this.witcherHealth = 100
      } else {
        this.witcherHealth = this.witcherHealth + healValue
      }
      this.mosterAttackTheWitcher()
      
    }
  },
  computed: {
    monsterBar() {
      return {width: this.monsterHealth + '%'}
    },
    witcherBar() {
      return {width: this.witcherHealth + '%'}
    },
    specialAttackWitcher() {
      return this.currentRound % 3 !== 0
    }
  }

})

app.mount('#game')