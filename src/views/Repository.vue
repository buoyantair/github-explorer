<template>
  <Layout>
    <div v-if="results">
      <div v-if="results.loading">Loading...</div>
      <div v-else-if="results.error">An error occured</div>
      <div v-else-if="results.data && results.data.repository">
        <div class="repo">
          <div class="card repo-info">
            <h1>{{ results.data.repository.name }}</h1>
            <p>{{ results.data.repository.description }}</p>
          </div>
          <div class="card repo-detail">
            <div
              v-for="entry in results.data.repository.ref.target.tree.entries"
              :key="entry.oid"
              class="entry"
            >{{ entry.name }}</div>
          </div>
          <div class="card viewport" v-html="currentFile.renderedHTML"></div>
        </div>
      </div>
      <div v-else>No result :(</div>
    </div>
  </Layout>
</template>
<script>
import Layout from '@/components/Layout.vue'
import marked from 'marked'
export default {
  name: 'Repository',
  components: {
    Layout
  },
  apollo: {
    repository: {
      query: require('../graphql/repository.gql'),
      variables() {
        return this.$data.variables
      },
      result(results) {
        this.$data.results = results
        const rootEntries = results.data.repository.ref.target.tree.entries
        if (rootEntries) {
          let readMeFile = rootEntries.find(x => x.name.match(/readme/i))
          readMeFile.fileType = readMeFile.name.split('.')[1]
          this.$data.currentFile = readMeFile
          this.$apollo.queries.object &&
            this.$apollo.queries.object.refetch({
              owner: this.$data.variables.owner,
              name: this.$data.variables.name,
              oid: readMeFile.oid
            })
        }
      }
    },
    object: {
      query: require('../graphql/object.gql'),
      result({
        data: {
          object: { object }
        }
      }) {
        if (object) {
          let currentFile = this.$data.currentFile
          switch (currentFile.fileType) {
            case 'md':
              currentFile.renderedHTML = marked(object.text)
              break
            default:
              currentFile.renderedHTML = object.text
              break
          }

          this.$data.currentFile = {
            ...currentFile,
            ...object
          }
        }
      }
    }
  },
  data() {
    return {
      variables: {
        owner: this.$route.params.id,
        name: this.$route.params.repo,
        qualifiedName: 'master'
      },
      results: {},
      currentFile: null
    }
  }
}
</script>
<style lang="scss" scoped>
.repo {
  width: 90%;
  margin: 30px auto;
  display: grid;
  grid-template-rows: repeat(3, minmax(100px, auto));
  grid-template-columns: 1fr;
  grid-gap: 20px;
}

.repo-info {
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: left;
  h1 {
    color: #22181c;
    font-size: 24;
    font-weight: bold;
    margin: 0 0 15px 0;
  }
  p {
    font-weight: lighter;
    color: #747474;
    font-size: 20px;
    margin: 0;
  }
}

.repo-detail {
  padding: 0;
  overflow: hidden;
  .entry {
    text-align: left;
    height: 20px;
    border-top: 1px solid #c4c4c4;
    padding: 10px;
    transition: all 0.2s;
    &:hover {
      cursor: pointer;
      background: #ebebeb;
    }
  }
  .entry:first-of-type {
    border: none;
  }
}

.viewport {
  padding: 30px;
  text-align: left;
}
</style>
