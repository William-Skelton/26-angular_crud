'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', 'authService', '$http', '$q', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<'
  }
};

function ThumbnailController($log, picService, authService, $http, $q) {
  $log.debug('ThumbnailController');

  this.deletePic = function() {
    $log.debug('thumbnailCtrl.deletePic');
    return authService.getToken()
    .then( token => {
      // console.log(this);
      // console.log(token);
      // console.log(__API_URL__);
      let url = `${__API_URL__}/api/gallery/${this.gallery._id}/pic/${this.pic._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then( () => {
      this.gallery.pics.splice(this.gallery.pics.indexOf(this.pic), 1)
    });
  };
};
