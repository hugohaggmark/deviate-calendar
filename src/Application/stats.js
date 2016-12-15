export const track = (action, label) => {
  if (window.dataLayer){
    window.dataLayer.push({
     'eventCategory': 'deviate-calendar',
     'eventAction': action,
     'eventLabel': label,
     'event': 'genericTrackEvent'
    })
  }
}
