<template lang="pug">
div
  select.lg(
    v-model="countryid"
    @change="regionid = townid = null"
  )
    option(
      v-for="country in countries"
      :value="country.countryid"
    ) {{country.name}}
  | &nbsp;
  select.lg(
    v-model="regionid"
  )
    option(
      v-for="region in computed_regions"
      :value="region.regionid"
    ) {{region.name}}
  | &nbsp;
  select.lg(
    :disabled="!regionid"
    v-model="townid"
    @change="geoSelected()"
  )
    option(
      v-for="town in computed_towns"
      :value="town.townid"
    ) {{town.name}}

  //- pre {{$data}}

</template>

<script>
export default {
  data() {
    return {
      hasData: false,
      countryid: null,
      regionid: null,
      townid: null,
      countries: null, //[]
      regions: null, //[]
      towns: null, //[]
      country_name: null,
      region_name: null,
      town_name: null
    }
  },
  computed: {
    computed_regions() {
      return (
        this.regions &&
        this.regions.filter((item) => item.countryid == this.countryid)
      )
    },
    computed_towns() {
      return (
        this.towns &&
        this.towns.filter((item) => item.regionid == this.regionid)
      )
    },

    curr_country() {
      return (
        this.countries &&
        this.countries.find((item) => item.countryid == this.countryid).name
      )
    },
    curr_region() {
      return (
        this.regions &&
        this.regionid &&
        this.regions.find((item) => item.regionid == this.regionid).name
      )
    },
    curr_town() {
      return (
        this.towns &&
        this.townid &&
        this.towns.find((item) => item.townid == this.townid).name
      )
    }
  },
  watch: {
    townid(newVal) {
      if (newVal) this.geoSelected()
    }
  },
  async created() {
    try {
      const { data } = await this.$axios.$get('/geo/')
      Object.assign(this.$data, data.geo)
      this.hasData = true
    } catch ({ response }) {
      this.$notice('Ошибка', response.data.message)
    }
  },
  // updated() {
  //   this.hasData && this.geoSelected()
  // },
  methods: {
    geoSelected() {
      let { townid, curr_country, curr_region, curr_town } = this
      this.$emit('selected', {
        townid,
        curr_country,
        curr_region,
        curr_town
      })
    }
  }
}
</script>
