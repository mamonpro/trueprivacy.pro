(function() {
  var settings = window.gdpr_settings || null;

  var Banner = function(settings) {
    this.host = 'http://trueprivacy.pro/';
    this.block = null;
    this.settings = settings;

    if(!this.settings) {
      console.warn('Config is not defined');
      return;
    }

    if(this.getCookie()) {
      console.log('User already agreed');
      return;
    }

    this.init();
  }

  Banner.prototype.init = function() {
    this.appendCSS();
    this.build();
  }

  Banner.prototype.appendCSS = function() {
    var nodeStylesheet = document.createElement('link');
    nodeStylesheet.href = this.host + 'themes/' + this.settings.theme.type + '.css';
    nodeStylesheet.type = 'text/css';
    nodeStylesheet.rel = 'stylesheet';
    nodeStylesheet.media = 'screen';

    document.getElementsByTagName('head')[0].appendChild(nodeStylesheet);
  }

  Banner.prototype.getCookie = function() {
    return /(^|;)\s*policy=/.test(document.cookie)
  }

  Banner.prototype.setCookie = function() {
    var date = new Date();
    date.setTime(date.getTime() + (this.settings.days * 24 * 60 * 60 * 1000));
    document.cookie = 'policy=1; expires= ' + date.toUTCString() + '; path=/';
  }

  Banner.prototype.build = function() {

    this.block = document.createElement('div');
    this.block.classList.add('b-policy');
    this.block.classList.add('b-policy_' + this.settings.theme.position);
    this.block.style.backgroundColor = this.settings.theme.backgroundColor;

    var inner = document.createElement('div');
    inner.classList.add('b-policy__inner');
    inner.classList.add('b-policy__inner_align-' + this.settings.theme.align);

    var text = document.createElement('div');
    text.classList.add('b-policy__text');

    text.appendChild(this.createHeading());
    text.appendChild(this.createLink());

    var control = document.createElement('div');
    control.classList.add('b-policy__control');

    control.appendChild(this.createButton());
    
    inner.appendChild(text)
    inner.appendChild(control)

    this.block.appendChild(inner)
    this.block.appendChild(this.createClose())

    document.getElementsByTagName('body')[0].appendChild(this.block);
  }

  Banner.prototype.createHeading = function() {
    var nodeHeading = document.createElement('div');
    nodeHeading.innerHTML = this.settings.heading.text;
    nodeHeading.classList.add('b-policy__heading');
    nodeHeading.style.color = this.settings.heading.color;
    nodeHeading.style.fontSize = this.settings.heading.fontSize + 'px';

    return nodeHeading;
  }

  Banner.prototype.createLink = function() {
    var nodeLink = document.createElement('a');
    nodeLink.innerHTML = this.settings.link.text;
    nodeLink.setAttribute('href', this.settings.link.url);
    nodeLink.classList.add('b-policy__link');
    nodeLink.style.color = this.settings.link.color;
    nodeLink.style.fontSize = this.settings.link.fontSize + 'px';

    return nodeLink;
  }

  Banner.prototype.createButton = function() {
    var nodeButton = document.createElement('div');
    nodeButton.innerHTML = this.settings.button.text;
    nodeButton.classList.add('b-policy__button');
    nodeButton.style.backgroundColor = this.settings.button.backgroundColor;
    nodeButton.style.color = this.settings.button.color;
    nodeButton.style.fontSize = this.settings.button.fontSize + 'px';

    var that = this;
    nodeButton.addEventListener('click', function(e) {
      e.preventDefault();
      that.setCookie();
      that.hide();
    })

    return nodeButton;
  }

  Banner.prototype.createClose = function() {
    var nodeClose = document.createElement('div');
    nodeClose.innerHTML = '<svg viewBox="0 0 20 20" id="icon-close" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path d="M16.293 16.809l-6.739-6.74-6.739 6.74M2.815 3.07l6.74 6.739 6.738-6.74" stroke-width="2" stroke-color="blue"></path></g></svg>';
    nodeClose.classList.add('b-policy__close');

    var that = this;
    nodeClose.addEventListener('click', function(e) {
      e.preventDefault();
        that.hide();
    })

    return nodeClose;
  }

  Banner.prototype.hide = function() {
    this.block.classList.add('__hide');
  }

  new Banner(settings);
})()