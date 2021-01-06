export default function ({ $auth, redirect }) {
  const store = JSON.parse(window.localStorage.getItem('vuex'))

  if (!store.state.auth.loggedIn) {
    redirect('/logar')
  }
}
