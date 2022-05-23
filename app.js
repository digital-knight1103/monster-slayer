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
      winner: null,
    }
  },
  methods: {
    // start new game => reset all value
    startNewGame() {
      this.witcherHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    weAttackMonster() {
      this.currentRound++
      //caltulate our attack about 16-8 power
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
  watch: {
  // observe a value whitch we have a data
    witcherHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0) {
        // We have a draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Witcher Lost
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      if(value <= 0 && this.witcherHealth <= 0) {
        // We have a draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Monster Lost
        this.winner = 'witcher'

      }
    }
  },
  computed: {
    monsterBar() {
      if(this.monsterHealth < 0) {
        return { width: '0%'}
      }
      return {width: this.monsterHealth + '%'}
    },
    witcherBar() {
      if(this.witcherHealth < 0) {
        return {width: '0%'}
      }
      return {width: this.witcherHealth + '%'}
    },
    specialAttackWitcher() {
      return this.currentRound % 3 !== 0
    }
  }

})

app.mount('#game')