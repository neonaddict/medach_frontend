import {
  getBlogs,
  getNews,
  getLongreadArticles,
  getPostsByTag
} from '~/utils/requests'

const translatedCategories = {
  cases: 'кейсы',
  guides: 'руководства',
  translated: 'переводы'
}

export const state = () => ({
  articles: [],
  popularAuthors: [],
  nextPage: null
})

export const mutations = {
  setArticles(state, {articles, nextPage}) {
    state.nextPage = nextPage
    state.articles = articles
  },

  updateArticles(state, {articles, nextPage}) {
    state.nextPage = nextPage
    state.articles = [...state.articles, ...articles]
  }
}

export const getters = {
  articles: (store) => store.articles,
  popularAuthors: (store) => store.popularAuthors,
  nextPage: (store) => store.nextPage
}

export const actions = {
  fetchCategory({commit}, {perPage, category, isSortByPopular, page, query}) {
    switch(category) {

      case 'blogs':
        return getBlogs(page, perPage, isSortByPopular, query).then(data => {
          commit('setArticles', {
            articles: data.collection,
            nextPage: data.meta.nextPage
          })
        })

      case 'news':
        return getNews(page, perPage, isSortByPopular, query).then(data => {
          commit('setArticles', { 
            articles: data.collection,
            nextPage: data.meta.nextPage
          })
        })

      case 'longread':
        return getLongreadArticles(page, perPage, isSortByPopular, query).then(data => {
          commit('setArticles', { 
            articles: data.collection,
            nextPage: data.meta.nextPage
          })
        })

      default: 
        return getPostsByTag(translatedCategories[category], page, perPage, isSortByPopular, query).then(data => {
          commit('setArticles', { 
            articles: data.collection,
            nextPage: data.meta.nextPage
          })
        })
    }
  },

  fetchNextPage({commit, state}, {perPage, category, isSortByPopular, query}) {
    if (state.nextPage) {
      switch(category) {

        case 'blogs':
          return getBlogs(state.nextPage, perPage, isSortByPopular, query).then(data => {
            commit('updateArticles', {
              articles: data.collection,
              nextPage: data.meta.nextPage
            })
          })

        case 'news':
          return getNews(state.nextPage, perPage, isSortByPopular, query).then(data => {
            commit('updateArticles', {
              articles: data.collection, 
              nextPage: data.meta.nextPage
            })
          })
        
        case 'longread':
          return getLongreadArticles(state.nextPage, perPage, isSortByPopular, query).then(data => {
            commit('updateArticles', { 
              articles: data.collection,
              nextPage: data.meta.nextPage
            })
          })

        default: 
          return getPostsByTag(translatedCategories[category], state.nextPage, perPage, isSortByPopular, query).then(data => {
            commit('updateArticles', { 
              articles: data.collection,
              nextPage: data.meta.nextPage
            })
          })
      }
    }
  }
}