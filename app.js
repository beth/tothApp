var Movie = Backbone.Model.extend({

  initialize: function(title){
    this.set('title',title)
  },

  url:'http://imdb.wemakesites.net/api/1.0/get/title/',

  loadMsgs: function(){
    //Basically an AJAX 'GET' request with options passed in the data
    //property of the object
    this.fetch({data: { q: this.get('title') },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data){
                  console.log(data);
                }
              });
  },

  parse: function(response, options){
    return response;
  }

});

var MovieView = Backbone.View.extend({
  initialize: function(){
    this.model.on('change', this.render, this);
  },

  render: function(){
    var html = '<img src="' + this.model.attributes.data.poster + '">' +
               '<br/>' +
               '<strong>' + this.model.attributes.data.title + '</strong>' +
               '<br/>' +
               this.model.attributes.data.description.replace(/\+/gi,' ').replace(/\%2C/gi, ',') +
               '<hr>';

    $('#details').append(this.$el.html(html));
  }
});

$('button#Search').on('click', function(){
  var text = $('#searchInput').val();

  var m = new Movie(text);
  m.loadMsgs();
  var v = new MovieView({model: m});


  $('#searchInput').val('');
});
