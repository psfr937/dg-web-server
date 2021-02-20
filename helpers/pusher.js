import Pusher from 'pusher-js'

const pusher = new Pusher('APP_KEY', {
  cluster: 'APP_CLUSTER',
  encrypted: true
});

export default pusher