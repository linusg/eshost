var $ = {
  global: this,
  createRealm(options) {
    options = options || {};
    options.globals = options.globals || {};

    var realm = createGlobalObject();
    realm.eval(this.source);
    realm.$.source = this.source;
    realm.$.destroy = function () {
      if (options.destroy) {
        options.destroy();
      }
    };
    for(var glob in options.globals) {
      realm.$.global[glob] = options.globals[glob];
    }

    return realm.$;
  },
  evalScript(code) {
    try {
      loadString(code);
      return { type: 'normal', value: undefined };
    } catch (e) {
      return { type: 'throw', value: e }
    }
  },
  getGlobal(name) {
    return this.global[name];
  },
  setGlobal(name, value) {
    this.global[name] = value;
  },
  destroy() { /* noop */ },
  IsHTMLDDA() { return {}; },
  source: $SOURCE,
};
