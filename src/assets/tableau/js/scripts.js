/**
 * General Brightcove video embed binding.
 *
 * This is a generic setup for in-page embedded players. We can bind a VideoJS wrapped object to a data property on the player DOM element, allowing us to control players by selecting the DOM element and accessing the bcPlayer data property. E.g.:
 *
 * $('#my-playerthing').data('bcPlayer').play();
 * $('#my-playerthing').data('bcPlayer').pause();
 *
 * A more complicated example that retrieves the full video metadata via the Brightcove catalog method:
 *
 * var $video = $('#my-player-object');
 *
 * $video.data('bcPlayer').catalog.getVideo($video.data('videoId'),
 * function(error, data) {
 *   // Do things with the return.
 *   console.log(data);
 * });
 *
 * This presumes that the Brightcove API script has been loaded on page.
 */
$(document).ready(function () {
  // Use the default Brightcove embed selector.
  var $players = $('.video-js');

  // Bail early if there aren't even any players.
  if (!$players.length || typeof window.videojs !== 'function') {
    return;
  }

  $players.each(function setupBrightcoveInstances() {
    var $this = $(this);

    // Pass in the DOM element, not the jQuery wrapped object.
    window.videojs($this[0]).ready(function prepareBrightcoveInstance() {
      $this.data('bcPlayer', this);
      $(document).trigger('brightcove:ready', $this.attr('id'));
    });
  });
});
;
/**
 * Components Utility Functions
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Declare this component's namespace.
Components.utils = {};

// Breakpoint values.
Components.utils.breakpoints = {
  mobileMax: 639,
  tabletMin: 640,
  tabletMax: 960,
  desktopMin: 961,
  contentMax: 1550,
  layoutMax: 1920
};

/**
 * Smooth Scroll to top of an element
 * @param  {jQuery Object} $element - Element to scroll to the top of
 * @param  {integer} duration       - Length of the animation
 * @param  {integer} offset         - Any offset to account for sticky elements
 * @param  {boolean} onlyUp         - Whether scroll should only happen if the scroll direction is up
 */
Components.utils.smoothScrollTop = function ($element, duration, offset, onlyUp) {
  duration = typeof duration === "number" ? duration : 500;
  offset = offset || 0;
  onlyUp = onlyUp || false;

  var elementTop = $element.offset().top,
      pageTop = $(window).scrollTop(),
      scroll = !onlyUp;

  if (onlyUp && pageTop > elementTop) {
    scroll = true;
  }

  if (scroll) {
    $('body, html').animate({
      scrollTop: elementTop - offset
    }, duration);
  }
};

/**
 * Get parsed URL params, with caching.
 *
 * @return {Object} URL Params
 */
Components.utils.getUrlParams = function () {
  var urlParams = Components.utils.parseUrlParams;
  // Return the cached result, or on cache miss, the result of the invoked
  // function, assigned to the cache property of this Function object.
  return urlParams.cache || (urlParams.cache = urlParams());
};

/**
 * Get parsed URL params.
 *
 * @return {Object} URL Params
 */
Components.utils.parseUrlParams = function () {
  var result = {},
    match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, ' '));
    },
    query = window.location.search.substring(1);

  while ((match = search.exec(query)) !== null) {
    result[decode(match[1])] = decode(match[2]);
  }

  return result;
};


/**
 * Helper to identify which breakpoint the browser is in.
 * @param  {string} layout - the layout mode to check for.
 * @return {Boolean} whether viewport is within specified breakpoint
 * @example Components.utils.breakpoint('mobile') - true if in mobile layout
 */
Components.utils.breakpoint = function (layout) {
  // Fail fast if matchMedia isn't present.
  if (typeof window.matchMedia !== 'function') {
    return false;
  }

  switch (layout) {
    case 'mobile':
      return matchMedia('(max-width: ' + Components.utils.breakpoints.mobileMax + 'px)').matches;
      break;
    case 'tablet':
      return matchMedia('(min-width:' + Components.utils.breakpoints.tabletMin + 'px) and (max-width: ' + Components.utils.breakpoints.tabletMax + 'px)').matches;
      break;
    case 'desktop':
      return matchMedia('(min-width: ' + Components.utils.breakpoints.desktopMin + 'px)').matches;
      break;
    default:
      return false;
  }
};

/**
 * Return the matching breakpoint name (mobile, tablet, or desktop).
 * Similar to Components.utils.breakpoint but returns the active breakpoint name instead.
 *
 * @todo refactor all existing usages of Components.utils.breakpoint to use this function.
 *
 * @returns {String}
 */
Components.utils.getBreakpoint = function () {
  var isTablet,
      isDesktop;

  // Fail fast if matchMedia isn't present. Assume desktop.
  if (typeof window.matchMedia !== 'function') {
    return 'desktop';
  }

  isTablet = matchMedia(
    '(min-width:' + Components.utils.breakpoints.tabletMin + 'px) and (max-width: ' +
    Components.utils.breakpoints.tabletMax + 'px)'
  ).matches;
  
  isDesktop = matchMedia(
    '(min-width: ' + Components.utils.breakpoints.desktopMin + 'px)'
  ).matches;

  if (isDesktop) {
    return 'desktop';
  }
  else if (isTablet) {
    return 'tablet';
  }
  else {
    return 'mobile';
  }
};

/**
 * Helper function to get the element's viewport center.
 * @param $element
 *
 * @returns string
 *  y position
 */
Components.utils.getElementViewPortCenter = function ($element) {
  var scrollTop = $(window).scrollTop(),
    scrollBot = scrollTop + $(window).height(),
    elHeight = $element.outerHeight(),
    elTop = $element.offset().top,
    elBottom = elTop + elHeight,
    elTopOffset = elTop < scrollTop ? scrollTop - elTop : 0,
    elBottomOffset = elBottom > scrollBot ? scrollBot - elTop : elHeight;

  // Return 50% if entire element is visible.
  if (elTopOffset === 0 && elBottomOffset === elHeight) {
    return '50%';
  }

  return Math.round(elTopOffset + ((elBottomOffset - elTopOffset) / 2)) + 'px';
};

/**
 * Helper function to decide the duration of an animation
 * @param {integer} distance - The distance needed to travel (such as height of an element that is expanding)
 * @param {integer} speed - Pixels per second. Defaults to 1000
 *
 * @returns integer
 *  miliseconds for animation dration
 */
Components.utils.animationDuration = function (distance, speed) {
  // Set default speed of 1000 px per second
  var speed = speed || 1000;

  return (distance/speed) * 1000;
};
;
/**
 * Accordion Utility
 *
 * Used for creating a list of expandable content in which only one item of
 * content is expanded at a time.
 *
 * Settings:
 *   itemSelector - Required - [string] - CSS selector for item wrappers
 *   headerSelector - Required - [String] - CSS selector for header elements
 *     that will be used to open/close accordion items when clicked
 *   contentSelector - Required - [String] - CSS selector for contents elements
 *     that will be hidden or shown when headers are clicked.
 *   animation - Optional - [Object] - animation settings for expanding/collapsing
 *
 * Usage:
 *   $('.accordion').accordion({
 *     itemSelector: '.accordion__item',
 *     headerSelector: '.accordion__header',
 *     contentSelector: '.accordion__contents'
 *   });
 *
 *  Available Methods:
 *    showItem - Show the specified item and collapse all others.
 *        Ex. $('.selector')[0].accordion.showItem($item);
 *    hideItem - Hide any open item within the accordion.
 *        Ex. $('.selector')[0].accordion.hideItem();
 */

(function ($) {

  // Set plugin method name and defaults
  var pluginName = 'accordion',
      defaults = {
        animation: {
          duration: 450,
          easing: "easeInOutQuart"
        }
      };

  // Plugin constructor
  function Plugin (element, settings) {
    // Set up internals for tracking, just in case.
    this._name = pluginName;
    this._defaults = defaults;
    this.$element = $(element);

    // Use defaults for any unassigned settings.
    _.defaults(settings, defaults);
    this.settings = settings;

    // Set several fixed global settings.
    // `open` class is used for legacy support.
    this.settings.openClasses = 'is-open open';
    this.settings.openSelector = '.is-open, .open';

    // Do initial setup stuff.
    this.init();
  }

  /**
   * Open the specified item in the accordion and manage closing other items.
   *
   * @param {jQuery Object} $item - The specific item to be opened.
   * @param {jQuery Object} $items - All items within the accordion.
   */
   Plugin.prototype.openAccordion = function ($item) {
    var $items = this.$element.find(this.settings.itemSelector),
        $otherItems = $items.not($item);

    // First make sure other open items are closed.
    this.hideItems($otherItems);

    // Then open/close the clicked item.
    if ($item.is(this.settings.openSelector)) {
      this.hideItem($item);
    } else {
      this.showItem($item);
    }

    // Trigger custom event for external scripts to know when an accordion is
    // interacted with.
    this.$element.trigger('accordion:after');
  };

  /**
   * Show the contents of the specified item
   *
   * @param {jQuery Object} $item - The item to show the contents of.
   */
  Plugin.prototype.showItem = function ($item) {
    $item.addClass(this.settings.openClasses);
    $item.find(this.settings.contentSelector).slideDown(this.settings.animation);
  };

  /**
   * Hide the contents of the specified item.
   *
   * @param {jQuery Object} $item - The item to hide the contents of.
   */
  Plugin.prototype.hideItem = function ($item) {
    $item.removeClass(this.settings.openClasses);
    $item.find(this.settings.contentSelector).slideUp(this.settings.animation);
  };

  /**
   * Hide any open items passed in.
   *
   * @param {jQuery Object} $items - The set of items to close if open.
   */
  Plugin.prototype.hideItems = function ($items) {
    var _this = this;

    $items.each(function (index, item) {
      if ($(item).is(_this.settings.openSelector)) {
        _this.hideItem($(item));
      }
    });
  };

  // Initial setup tasks
  Plugin.prototype.init = function () {
    var _this = this,
        $items = this.$element.find(_this.settings.itemSelector),
        hash = window.location.hash;

    // Initially hide contents of all items, except those specified as open by
    // defualt in the markup.
    $items.not(_this.settings.openSelector).find(_this.settings.contentSelector).hide();

    // Handle showing an accordion item when its heading is clicked.
    this.$element.find(_this.settings.headerSelector).on('click.accordion', function (e) {
      _this.openAccordion($(this).closest(_this.settings.itemSelector));

      e.preventDefault();
    });

    // Expand accordion items when linked to with a hash.
    if ($(hash).length && _this.$element.find($(hash)).length) {
      var $item = $(hash).is(_this.settings.itemSelector) ? $(hash) : $(hash).closest(_this.settings.itemSelector);

      _this.openAccordion($item);
    }
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[pluginName] = function (settings) {
    return this.each(function initPlugin() {
      var plugin;

      if (!$.data(this, 'plugin_' + pluginName)) {
        plugin = new Plugin(this, settings);
        $.data(this, 'plugin_' + pluginName, plugin);

        // Expose the plugin so methods can be called externally
        // E.g.: element.accordion.openAccordion();
        this.accordion = plugin;
      }
    });
  };
})(jQuery);
;
/**
 * Auto Suggest Field
 *
 * Present an auto-populated field in a slimmer manner to reduce visual impact
 * of a form's initial state. An "Edit" link is provided to override the
 * auto-populated value.
 *
 * Usage:
 *   // Initialize plugin
 *   $('.auto-suggest').autoSuggest({
 *     suggestingClass: 'suggesting'
 *   });
 *
 *   // Set value of a suggestion field
 *   element.autoSuggest.setSuggestion('newValue');
 */

(function ($) {

  // Set plugin method name and defaults
  var pluginName = 'autoSuggest',
      defaults = {
        // Selector for the value placeholder when in suggesting mode
        placeholderSelector: '.auto-suggest__placeholder',
        // Selector around the edit link
        editSelector: '.auto-suggest__edit-link',
        // Selector around the base field
        fieldSelector: '.auto-suggest__field',
        // Class indicating that the suggestion widget is shown
        suggestingClass: 'is-suggesting'
      };

  // plugin constructor
  function Plugin (element, options) {
    // Set up internals for tracking, just in case.
    this._name = pluginName;
    this._defaults = defaults;
    this.element = $(element);

    // Use the init options.
    this.options = $.extend({}, defaults, options);

    // Collect some elements needed for later
    this._placeholder = this.element.find(this.options.placeholderSelector);
    this._editLink = this.element.find(this.options.editSelector);
    this._field = this.element.find(this.options.fieldSelector);

    // Do setup stuff.
    this.init();
  }

  /**
   * Sets the value of the field with a suggested value.
   *
   * @param {string} value - The value to set the suggestion field to.
   */
  Plugin.prototype.setSuggestion = function (value) {
    var valueText = this._field.find('option[value="' + value + '"]').text();

    // We need to handle things specially if we're dealing with a select field
    if (this._field.is('select')) {
      if (valueText) {
        // If valueText is set, we need to use text node of the option rather
        // than the value of the select directly.
        this._placeholder.text(valueText);
      } else {
        // If the select list doesn't have a corresponding value, we can't set
        // the suggestion.
        return false;
      }
    } else {
      this._placeholder.text(value);
    }

    // Ensure that the base field matches the suggestion.
    this._field.val(value);

    // Finally, add the suggesting class to make sure the suggestion widget
    // shows up.
    this.element.addClass(this.options.suggestingClass);
  };

  // Hand-full of setup tasks
  Plugin.prototype.init = function () {
    var _this = this;

    // If the field already has a value, set the suggestion widget
    if (_this._field.val() && _this._field.val() !== '_none') {
      _this.setSuggestion(_this._field.val());
    }

    // Swap back to original field when the user wants to edit the value.
    _this._editLink.on('click.autoSuggest', function(e) {
      _this.element.removeClass(_this.options.suggestingClass);
      e.preventDefault();
    });
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function initPlugin() {
      var plugin = new Plugin(this, options);
      // Allow the plugin to be instantiated more than once.
      $.data(this, 'plugin_' + pluginName, plugin);

      // Expose the plugin so methods can be called externally
      //   Ex. element.autoSuggest.setSuggestion();
      this.autoSuggest = plugin;
    });
  };
})(jQuery);
;
/**
 * Content Flyout utility.
 *
 * Set up a content region that is hidden by default and "flies out" from the
 * right side of the page when a trigger is clicked.
 *
 * Options:
 *   triggers - Required - [jQuery Object] - element(s) to be used as a trigger
 *   slideout - Required - [jQuery Object] - element to slide off screen when content flys in
 *   contents - Optional - [jQuery Object] - element(s) to use as content wrapper
 *   closeLinks - Optional - [jQuery Object] - element(s) to be used to trigger colsing flyout
 *   scroll - Optional - [boolean] - whether the page should scroll up to the flyout content if needed
 *   stayOnTop - Optional - [boolean] - Whether the flyout content should go ontop rather than push slideout content
 *   animation - Optional - [object] - animation settings for expanding/collapsing
 *
 * Usage:
 *  $('.flyout-content-wrapper').contentFlyout({
 *    triggers: $('.triggers-selector')
 *  });
 */

(function ($) {

  // Set plugin method name and defaults
  var pluginName = 'contentFlyout',
      defaults = {
        animation: {
          duration: 1000,
          easing: "easeInOutQuart"
        },
        scroll: true,
        stayOnTop: false
      };


  // plugin constructor
  function Plugin (element, options) {
    // Set up internals for tracking, just in case.
    this._name = pluginName;
    this._defaults = defaults;
    this.element = $(element);

    // Use the init options.
    this.options = $.extend({}, defaults, options);

    // Do it now.
    this.init();

    // Fly out content automatically if there's a matching hash in the URL.
    this.autoReveal();
  }

  /**
   * Show the target content based on the specified $trigger
   *
   * @param {jQuery Object} $trigger - The trigger link corresponding to the
   * content to be displayed
   * @param {Object} settings - Additional options to override defaults including:
   *          {Object} animation - overrides to the default animation settings
   *          {Boolean} scroll - Whether or not to scroll to the conent
   *          {Boolean} scrollDown - Whether or not clicking this trigger should
   *            scroll down to the top of the flyout content container.
   */
  Plugin.prototype.showContent = function(trigger, settings) {
    var data = $(trigger).length ? $(trigger).data() : {},
        $target = data.flyoutTarget ? $('#' + data.flyoutTarget) : this.element,
        $parent = $target.offsetParent(),
        $slideout = $parent.find(this.options.slideout),
        href = $(trigger).length ? $(trigger).attr('href') : '',
        parentPadding = $parent.outerHeight() - $parent.height(),
        offset = $('.sticky-wrapper').outerHeight(true),
        distance = Math.round($target.outerWidth() / $parent.width() * 100),
        $moving,
        defaultSettings = {
          scroll: this.options.scroll,
          scrollDown: data.flyoutScrollDown,
          animation: this.options.animation
        };

    // Merge settings with defaults.
    settings = $.extend({}, defaultSettings, settings);

    $target.data('flyoutState', 'open');

    // Adjust height of parent, as long as it's not the body or html element.
    if (!$parent.is('body, html')) {
      $parent.animate({
        height: $target.outerHeight(true) - parentPadding,
      }, settings.animation);
    }

    if (this.options.stayOnTop) {
      $moving = $target;
    }
    else {
      $moving = $target.add($slideout);
    }

    // @TODO investigate rewriting this using just classes and CSS transitions.
    $moving.animate({
      marginLeft: '-=' + distance + '%',
    }, settings.animation);

    $target.add($slideout).addClass('is-open');

    if (settings.scroll) {
      Components.utils.smoothScrollTop($parent, settings.animation.duration, offset, !settings.scrollDown);
    }

    // Push the current state to the URL
    if ((href.indexOf('#') === 0) && (href.length > 1) && (history.replaceState)) {
      history.replaceState(undefined, undefined, href);
    }
  };

  // Hide the target content
  Plugin.prototype.hideContent = function(trigger) {
    var data = $(trigger).length ? $(trigger).data() : {},
        $target = data.flyoutTarget ? $('#' + data.flyoutTarget) : this.element,
        $parent = $target.offsetParent(),
        $slideout = $parent.find(this.options.slideout),
        slideoutHeight = $slideout.outerHeight(true),
        distance = Math.round($target.outerWidth() / $parent.width() * 100),
        $moving;

    $target.data('flyoutState', 'closed');

    // Adjust height of parent, as long as it's not the body or html element.
    if (!$parent.is('body, html')) {
      $parent.animate({
        height: slideoutHeight,
      }, this.options.animation);
    }

    if (this.options.stayOnTop) {
      $moving = $target;
    }
    else {
      $moving = $target.add($slideout);
    }

    // @TODO investigate rewriting this using just classes and CSS transitions.
    $moving.animate({
      marginLeft: '+=' + distance + '%',
    }, this.options.animation);

    $target.add($slideout).removeClass('is-open');

    // Reset height of $parent to inherit in case of screen resizing that would
    // need to adjust the height.
    setTimeout(function() {
      $parent.css('height', 'inherit');
    }, this.options.animation.duration + 1);

    // Remove the current state from the URL
    if ((window.location.hash.indexOf('#') === 0) && (history.replaceState)) {
      history.replaceState(undefined, undefined, window.location.pathname);
    }
  };

  // Automatically reveal content when the ID of the container is in the URL
  // hash.
  Plugin.prototype.autoReveal = function() {
    var hash = window.location.hash,
        $trigger;

    // Avoid colliding with flyout form behavior.
    if (hash === "#form") {
      return;
    }

    // If the hash exists (e.g. #something) and it matches using jQuery selection.
    if (hash.length > 1 && this.element.is(hash)) {
      $trigger = $(hash).data('flyoutTrigger');

      // Prevent scrolling to the anchor...
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 1);

      this.showContent($trigger, {
        animation: {duration: 0},
        scroll: true,
        scrollDown: true
      });
    }
  };

  // Hand-full of setup tasks
  Plugin.prototype.init = function () {
    var _this = this,
        $triggers = $();

    // Link content back to it's corresponding trigger
    _this.options.triggers.each(function(index, el) {
      var $trigger = $(this),
          targetId = $trigger.data('flyoutTarget'),
          $target = $('#' + targetId);

      // Only pay attention if the target is the correct one.
      if (_this.element.is($target)) {
        $triggers = $triggers.add($trigger);
        $target.data('flyoutTrigger', $trigger);

        // Set the trigger link's href if it isn't already set, excluding "#".
        if ($trigger.attr('href').length <= 1) {
          $trigger.attr('href', '#' + targetId);
        }
      }
    });

    if ($triggers.length && _this.element.length) {
      // Add flyout-state data
      _this.element.data('flyoutState', 'closed');


      // Set the relative parent to hide overflow
      _this.element.each(function(index, el) {
        $(this).show();

        if (!$(this).offsetParent().is('body, html')) {
          $(this).offsetParent().css('overflow', 'hidden');
        }
        else {
          $(this).offsetParent().css('overflow-x', 'hidden');
        }
      });

      // Handle opening the flyout when a trigger is clicked.
      $triggers.on('click.flyout', function(e) {
        var trigger = this,
            $target = $('#' + $(trigger).data('flyoutTarget')),
            state = $target.data('flyoutState');

        // Set the speed of the animation to be consistent regardless of viewport.
        _this.options.animation.duration = Components.utils.animationDuration($target.outerWidth(), 1500);

        if (state === 'closed') {
          setTimeout(function() {
            _this.showContent(trigger);
          }, 1);
        }
        e.preventDefault();
      });

      // Handle closing the flyout when a close link is clicked.
      _this.options.closeLinks.on('click.flyout', function(e) {
        var $parent = $(this).closest(_this.element),
            state = $parent.data('flyoutState');

        // Double-check that the flyout is open and it's the correct flyout.
        if (_this.element.is($parent) && state === 'open') {
          _this.hideContent($parent.data('flyoutTrigger'));
        }
        e.preventDefault();
      });
    }
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function initPlugin() {
      var plugin = new Plugin(this, options);
      // Allow the plugin to be instantiated more than once. Event handlers
      // will be re-bound to avoid issues.
      $.data(this, 'plugin_' + pluginName, plugin);

      // Expose the plugin so methods can be called externally
      //   Ex. $(element).contentFlyout.showContent();
      this.contentFlyout = plugin;
    });
  };
})(jQuery);
;
/**
 * Content Reveal utility.
 *
 * Set a wrapper around content as a revealable region. Assign a "trigger"
 * element as the toggle to expand and collapse the content region.
 *
 * Options:
 *    triggers - Required - [jQuery Object] - element(s) to be used as a trigger
 *    contents - Optional - [jQuery Object] - element(s) to use as content wrapper
 *    closeLink - Optional - [boolean] - whether a close link should be added
 *    animation - Optional - [object] - animation settings for expanding/collapsing
 *
 * Usage:
 *    $('.content-wrapper').contentReveal({
 *      triggers: $('.triggers-selector')
 *    });
 *
 * Available Methods:
 *    showContent - Trigger a particular reveal content wrapper to show
 *        Ex. $('.content-wrapper')[0].contentReveal.showContent();
 *    hideContent - Trigger a particular reveal content wrapper to hide
 *        Ex. $('.content-wrapper')[0].contentReveal.hideContent();
 */

(function ($) {

  // Set plugin method name and defaults
  var pluginName = 'contentReveal',
      defaults = {
        animation: {
          duration: 1000,
          easing: "easeInOutQuart"
        },
        closeLink: true
      };

  // plugin constructor
  function Plugin (element, options) {
    // Set up internals for tracking, just in case.
    this._name = pluginName;
    this._defaults = defaults;
    this.element = $(element);

    // Use the init options.
    this.options = $.extend({}, defaults, options);

    // Do setup stuff.
    this.init();

    // Reveal content automatically if there's a matching hash in the URL.
    this.autoReveal();
  }

  /**
   * Reveal content based ont he passed in trigger link.
   *
   * @param {jQuery Object} $trigger - The link corresponding to the content to display
   * @param {Object} settings - Additional options to override defaults including:
   *          {Object} animation - overrides to the default animation settings
   *          {String} scrollBehavior - how scrolling should be handled
   *          {String} hideText - Text to swap into the trigger link while the
   *            reveal is in the open state
   *          {String} media - Type of media in the content container if special
   *            handling is needed
   *          {Boolean} expandToggle - Whether the trigger link has an expand icon
   */
  Plugin.prototype.showContent = function(trigger, settings) {
    var $trigger = $(trigger).length ? $(trigger) : this.element.data('reveal-trigger'),
        href = $trigger.attr('href'),
        data = $trigger.data(),
        $target = $('#' + data.revealTarget),
        $curtain = $('#' + data.revealCurtain),
        scrollOffset = $('.sticky-wrapper .stuck').outerHeight(true),
        defaultSettings = {
          animation: this.options.animation,
          scrollBehavior: data.revealScroll,
          hideText: data.revealHideText,
          media: data.revealMedia,
          expandToggle: data.revealExpandToggle
        },
        $scrollTarget,
        videoObj,
        player;

    // Merge settings with defaults.
    settings = $.extend({}, defaultSettings, settings);

    $target.add($trigger).data('revealState', 'open').addClass('is-open');
    if (settings.hideText) {
      $trigger.text(settings.hideText);
    }

    // Swap content.
    // NOTE: Video players break via display:none, thus custom function.
    $curtain.slideHeight('up', settings.animation);
    $target.slideHeight('down', settings.animation);

    if (settings.media === 'video') {
      videoObj = $target.find('.video-js')[0];
      player = videojs(videoObj);

      setTimeout(function() {
        // Ensure player is ready before calling .play()
        player.ready(function () {
          player.play();
        });
      }, settings.animation.duration / 2);
    }

    // Scroll when reveal is clicked open.
    if (settings.scrollBehavior) {
      switch (settings.scrollBehavior) {
        case 'trigger':
          $scrollTarget = $trigger;
          break;
        case 'target':
          $scrollTarget = $target;
          break;
        default:
          $scrollTarget = $('#' + settings.scrollBehavior);
          break;
      }
      Components.utils.smoothScrollTop($scrollTarget, settings.animation.duration, scrollOffset, false);
    }
    else if ($curtain.length) {
      // Use curtain for scroll.
      Components.utils.smoothScrollTop($curtain, settings.animation.duration, scrollOffset, true);
    }

    // Special expand icon handling
    if (settings.expandToggle) {
      $trigger.addClass('link--collapse').removeClass('link--expand');
    }

    // Push the current state to the URL
    if ((href.indexOf('#') === 0) && (href.length > 1) && (history.replaceState)) {
      history.replaceState(undefined, undefined, href);
    }
  };

  // Hide the target content
  Plugin.prototype.hideContent = function(trigger) {
    var $trigger = $(trigger).length ? $(trigger) : this.element.data('reveal-trigger'),
        data = $trigger.data(),
        $target = $('#' + data.revealTarget),
        $curtain = $('#' + data.revealCurtain),
        showText = data.revealShowText,
        media = data.revealMedia,
        expandToggle = data.revealExpandToggle,
        player;

    $target.add($trigger).data('revealState', 'closed').removeClass('is-open');

    if (typeof showText !== 'undefined') {
      $trigger.text(showText);
    }

    // Swap content.
    $target.slideHeight('up', this.options.animation);
    $curtain.slideHeight('down', this.options.animation);

    if (media === 'video') {
      player = videojs($target.find('.video-js')[0]);
      player.pause();
    }

    // Special expand icon handling
    if (expandToggle) {
      $trigger.addClass('link--expand').removeClass('link--collapse');
    }

    // Remove the current state from the URL
    if ((window.location.hash.indexOf('#') === 0) && (history.replaceState)) {
      history.replaceState(undefined, undefined, window.location.pathname);
    }
  };

  // Automatically reveal content when the ID of the container is in the URL
  // hash.
  Plugin.prototype.autoReveal = function() {
    var hash = window.location.hash,
        $trigger;

    // If the hash exists (e.g. #something) and it matches using jQuery selection.
    if (hash.length > 1 && this.element.is(hash)) {
      $trigger = $(hash).data('revealTrigger');

      this.showContent($trigger, {
        animation: {duration:0},
        scrollBehavior : "target"
      });
    }
  };

  // Hand-full of setup tasks
  Plugin.prototype.init = function () {
    var _this = this,
        $triggers = $();

    // Link content back to its corresponding trigger
    _this.options.triggers.each(function() {
      var $trigger = $(this),
          targetId = $trigger.data('revealTarget'),
          $target = $('#' + targetId);

      // Only pay attention if the target is the correct one.
      if (_this.element.is($target)) {
        $triggers = $triggers.add($trigger);
        $target.data('revealTrigger', $trigger);
        $target.data('revealState', 'closed');

        // Set the trigger link's href if it isn't already set, excluding "#".
        if ($trigger.attr('href').length <= 1) {
          $trigger.attr('href', '#' + targetId);
        }
      }
    });

    if ($triggers.length && _this.element.length) {
      // Add reveal-state data
      _this.element.data('revealState', 'closed');

      // Add a close icon to each content continer
      if (_this.options.closeLink) {
        _this.element.prepend($('<a href="#" class="reveal__close" href="#"><i class="icon icon--close-window-style2"></i></a>'));
      }

      $triggers.each(function() {
        var $trigger = $(this),
            $target = $('#' + $trigger.data('revealTarget')),
            showText = $trigger.text();

        // Link content back to it's corresponding trigger
        $target.data('revealTrigger', $trigger);

        // Special handling for links with an expand icon.
        if ($trigger.hasClass('link--expand')) {
          $trigger.data('revealExpandToggle', true);
        }

        // Save original trigger text
        if (typeof $trigger.data('revealHideText') !== 'undefined') {
          $triggers.data('revealShowText', showText);
        }

        // Remove close link if the data attribute is set to false.
        if (_this.options.closeLink && $trigger.data('revealCloseLink') === false) {
          $target.find('.reveal__close').remove();
        }
      });

      $triggers.on('click.reveal', function(e) {
        var state = _this.element.data('revealState');

        if (state === 'closed') {
          _this.showContent(this);
        } else if (state == 'open') {
          _this.hideContent(this);
        }
        e.preventDefault();
      });

      $('.reveal__close').on('click.reveal', function(e) {
        var $parent = $(this).closest(_this.element),
            state = $parent.data('revealState');

        // Double-check that the flyout is open and it's the correct flyout.
        if (_this.element.is($parent) && state === 'open') {
          _this.hideContent($parent.data('revealTrigger'));
        }
        e.preventDefault();
      });
    }
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function initPlugin() {
      var plugin = new Plugin(this, options);
      // Allow the plugin to be instantiated more than once. Event handlers
      // will be re-bound to avoid issues.
      $.data(this, 'plugin_' + pluginName, plugin);

      // Expose the plugin so methods can be called externally
      //   Ex. $(element).contentReveal.showContent();
      this.contentReveal = plugin;
    });
  };
})(jQuery);
;
'use strict';

/**
 * jQuery Dynamic Select Filters
 *
 * Given a set of input radio options, generate a corresponding select list per
 * option group and binds change events so that using the select triggers the
 * original option inputs, which may now be hidden.
 *
 * The javascript init, with options thrown in:
 *

  $('.filter-set').dynamicSelectFilters({
    container: '.mobile-filter-set',
    groupHeading: '.filter-set__heading',
    onCreateSelectCallback: function () {
      // 'this' is the jQuery wrapped select element, created per group set.
      this.wrap('<div class="form-field__wrapper"><div class="form__select"></div></div>');

      // Perform additional event bindings as needed.
      this.on('click.namespace', function myCoolEvent(e) {
        doMyThings();
      });
    }
  });

 */
(function ($) {
  // Set plugin method name and defaults
  var pluginName = 'dynamicSelectFilters',
      defaults = {
        // A DOM selector of the container to place the dynamic <select> elements.
        // If not defined, one will be generated and placed before the first
        // option group found.
        container: false,
        // An optional DOM selector to provide a default option in the select
        // element. Should be located inside the grouping DOM element.
        groupHeading: '',
        // Callback function after each select is created. Passes in the newly
        // created select jQuery element to perform any additional modifications.
        onCreateSelectCallback: null
      };

  // plugin constructor
  function Plugin (element, options) {
    var $element = $(element);

    // Set up internals for tracking, just in case.
    this._name = pluginName;
    this._defaults = defaults;
    this._element = $element;

    // Use the init options.
    this.options = $.extend(true, defaults, options);

    // Do it now.
    this.init();
  }

  Plugin.prototype.init = function () {
    var _options = this.options,
        $radioGroups = this._element,
        $selectContainer = $radioGroups.find(_options.container);

    if (!$radioGroups.length) {
      return;
    }

    // If no container for the select is defined, add one.
    if (!$selectContainer.length) {
      $radioGroups.eq(0).before('<div class="dynamic-select-container"></div>');
      $selectContainer = $radioGroups.eq(0).prev('.dynamic-select-container');
    }

    $radioGroups.each(function initSelectDuplication() {
      var $this = $(this),
          // Grouping label, generated as a disabled option within the select to
          // act as a label.
          groupHeading = $this.find(_options.groupHeading),
          $input = $this.find('input[type="radio"]'),
          $label = $this.find('label'),
          $select = $('<select>'),
          selectOptions = '';

      if (!$input.length) {
        return;
      }

      // If given a groupHeading element, use it to create a placeholder-esque
      // option for the current <select>
      if (groupHeading.length) {
        selectOptions = '<option class="select-placeholder" disabled selected>' + groupHeading.text().trim().replace(/\:$/, '') + '</option>';
      }

      // Continue building out the select options using all the radio/checkbox inputs.
      $input.each(function buildSelectOptions() {
        var $this = $(this),
            $label = $this.next('label'),
            triggerElement = '#' + $this.attr('id').trim(),
            isSelected = ($this.is(':checked')) ? 'selected' : '';

        // Let the option value be the input element to trigger, by DOM id.
        selectOptions += '<option value="' + triggerElement + '" ' + isSelected + '>' + $label.text() + '</option>';

        // Sync the select state when the option input is used.
        $this.on('change.dynamicfilter', function twoWayValueBind() {
          $select.find('option[value="' + triggerElement + '"]').prop('selected', true);
        });
      });

      // Flesh out the select, and enact bindings.
      $select.html(selectOptions)
        .on('change.dynamicfilter', function bindDynamicSelectActions() {
          var $triggerEl = $($(this).val());

          $triggerEl.prop('checked', true).trigger('change');
        })
        .appendTo($selectContainer);

        // Apply any per instance callbacks.
        if (typeof _options.onCreateSelectCallback === 'function') {
          _options.onCreateSelectCallback.call($select);
        }
    });
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function initPlugin() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new Plugin(this, options));
      }
    });
  };
})(jQuery);
;
"use strict";

/**
 * jQuery Float Labels
 *
 * A simple plugin to enable the floating label pattern. It makes no attempt to
 * control any interactions of the label within js. It just binds to events as
 * needed and triggers configurable CSS classes.
 *
 * The jQuery method is called on the wrapper element that contains both the field
 * and the label. It might look like:
 *
 * <div class="field__wrapper">
 *   <label class="field__label" for="this-field">My Super Label</label>
 *   <input name="this-field">
 * </div>
 *
 * The javascript init, with options thrown in:
 * $('.field__wrapper').floatLabel({
 *   activeClass: 'activated',
 *   focusClass: 'zenified'
 * });
 */
(function ($) {
  // Set plugin method name and defaults
  var pluginName = 'floatLabel',
      defaults = {
        // In case you want to preserve labels as visible for no js, or old
        // IE users.
        wrapperInitClass: 'has-float-label',
        // For a custom label selector, if you have multiple labels, for some
        // reason.
        labelSelector: false,
        // Class given to label when its field has a non-null value. Toggled
        // when the value is empty / falsy.
        activeClass: 'is-active',
        // Class given to input when it has an empty value.
        emptyClass: 'is-empty',
        // Class given to label when its field is focused. Toggled when it
        // loses focus.
        focusClass: 'has-focus',
        // Class for lack of proper placeholder support.
        badSupportClass: 'is-msie'
      },
      // Detect misbehaved user agents.
      hasBadPlaceholderSupport = Boolean(window.navigator.userAgent.match(/(MSIE |Trident\/)/));

  // plugin constructor
  function Plugin (element, options) {
    var $element = $(element);

    // Set up internals for tracking, just in case.
    this._name = pluginName;
    this._defaults = defaults;
    this._element = $element;

    // Use the init options.
    this.options = $.extend(true, defaults, options);

    // Set up a couple of internals to keep track of input and label.
    this._wrapper = $element;
    this._input = this._findInput($element);
    this._label = this._findLabel($element);

    // Do it now.
    this.init();
  }

  // Utility: find a input that we want to alter the label for.
  Plugin.prototype._findInput = function($el) {
    var $textInputs = $el.find('input, textarea').not('[type="checkbox"], [type="radio"]');
    // The regular text input types.
    if ($textInputs.length) {
      return $textInputs;
    }
    // Try for select elements.
    else {
      return $el.find('select');
    }
  };

  // Utility: find a label in the field wrapper element.
  Plugin.prototype._findLabel = function(el) {
    // If a custom selector is provided
    if (this.options.labelSelector) {
      return $(el).find(this.options.labelSelector);
    }

    // Just try a label element.
    return $(el).find('label');
  };

  Plugin.prototype._checkValue = function () {
    var isEmpty = this._input.val() === '' || this._input.val() === '_none';

    // Apply the correct classes based on value emptiness.
    this._input.toggleClass(this.options.emptyClass, isEmpty);
    this._label.toggleClass(this.options.activeClass, !isEmpty);

    // Apply the bad placeholder support classes if needed.
    this._label.add(this._input)
      .toggleClass(this.options.badSupportClass, hasBadPlaceholderSupport);
  };

  Plugin.prototype._onKeyUp = function () {
    this._checkValue();
  };

  Plugin.prototype._onFocus = function () {
    this._label.addClass(this.options.focusClass);
    this._onKeyUp();
  };

  Plugin.prototype._onBlur = function () {
    this._label.removeClass(this.options.focusClass);
    this._onKeyUp();
  };

  Plugin.prototype.init = function () {
    // Mark the element as having been init'ed.
    this._element.addClass(this.options.wrapperInitClass);

    // Check value for initial active class.
    this._checkValue();

    // Event bindings to the input element with floatLabels namespace.
    this._input
      .off('keyup.floatLabels change.floatLabels')
      .on('keyup.floatLabels change.floatLabels', $.proxy(this._onKeyUp, this));
    this._input
      .off('blur.floatLabels')
      .on('blur.floatLabels', $.proxy(this._onBlur, this));
    this._input
      .off('focus.floatLabels')
      .on('focus.floatLabels', $.proxy(this._onFocus, this));
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function initPlugin() {
      // Allow the plugin to be instantiated more than once. Event handlers
      // will be re-bound to avoid issues.
      $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
    });
  };
})(jQuery);
;
/**
 * A re-implementation of jQuery's slideDown() and slideUp() that animates the
 *  height of an element without requiring the use of display: none;
 *
 *  Helpful when needing to hide a video player while maintaining control via an
 *  API.
 *
 *  This function enforces "overflow: hidden" in order to work properly.
 *  To hide the element by default, set "height: 0" in CSS as well.
 */

(function ($) {

  $.fn.slideHeight = function (direction, options) {
    var $el = $(this);

    options = options || {duration: 400, easing: 'swing'};

    if (direction === 'down') {
      var $elClone = $el.clone()
          // Find all :checked elements (checkboxes, radio buttons, and options of select elements).
          .find(':checked')
          // Remove name attributes from checked elements to prevent the cloned source
          // elements from getting unchecked.
          .removeAttr('name')
          // End the current selection and return to the cloned elements selection, for chaining.
          .end()
          .css({'height': 'auto'}).appendTo($el.parent()),
          elHeight = $elClone.outerHeight(true);

      // Removing clone needed for calculating height.
      $elClone.remove();

      $el.animate({
          height: elHeight
        },
        options.duration,
        options.easing,
        function () {
          // Reset the height to auto to ensure the height remains accurate on viewport resizing
          $el.css({
            height: 'auto',
            overflow: 'inherit'
          });
        }
      );
    }

    if (direction === 'up') {
      // Enforce height zero.
      $el.css('overflow', 'hidden');

      $el.animate({
        height: 0
      }, options);
    }

    return this;
  };

})(jQuery);
;
/**
 * Tabs content utility
 *
 * Create interactive tabs that switch between different visible content when
 * tabs are clicked.
 *
 * Options:
 *   tabLinks - Required - [jQuery Object] - element(s) to be used as a trigger
 *   contents - Required - [jQuery Object] - element(s) to use as content wrapper
 *   triggers - Optional - [jQuery Object] - additional elements (other than tabs)
 *     used for triggering the display of specific tabs
 *   animation - Optional - [object] - animation settings for expanding/collapsing
 *
 * Usage:
 *   $('.tabs-wrapper-selector').tabs({
 *     tabLinks: $('.tab-links-selector'),
 *     contents: $('.tab-contents-wrapper-selector'),
 *     triggers: $('.tab-triggers-selector')
 *   });
 */

(function ($) {

  // Set plugin method name and defaults
  var pluginName = 'tabs',
      defaults = {
        animation: {
          duration: 1000,
          easing: "easeInOutQuart"
        }
      };

  // plugin constructor
  function Plugin (element, options) {
    // Set up internals for tracking, just in case.
    this._name = pluginName;
    this._defaults = defaults;
    this.element = $(element);

    // Use the init options.
    this.options = $.extend({}, defaults, options);

    // Limit tabLinks and contents down to only the the set within this instance.
    this.options.tabLinks = this.element.find(this.options.tabLinks).add(this.element.find(this.options.triggers));
    this.options.contents = this.element.find(this.options.contents);

    // Do setup stuff.
    this.init();

    // Display tab automatically if there's a matching hash in the URL.
    if (window.location.hash.length) {
      this.autoReveal();
    }
  }

  /**
   * Brings a tab into view based on the corresponding tab link passed.
   *
   * @param {jQuery Object} $link - The link corresponding to the tab to display
   * @param {Object} settings - Additional options to override defaults including:
   *          {Object} animation - overrides to the default animation settings
   *          {String} scrollBehavior - how scrolling should be handled
   */
  Plugin.prototype.showTab = function($link, settings) {
    var $content = $('#' + $link.data('tab-content')),
        $previousContent = this.options.contents.filter('.is-active'),
        previousContentHeight = $previousContent.outerHeight(true),
        $flyoutContainer = $content.closest('.flyout__content'),
        href = $link.attr('href'),
        $contentClone = $content.clone().show().css({"height":"auto"}).appendTo($content.parent()),
        contentHeight = $contentClone.outerHeight(true),
        scrollOffset = $('.sticky-wrapper .stuck').outerHeight(true),
        defaultSettings = {
          animation: {
            duration: !isNaN(this.element.data('tabs-duration')) ? this.element.data('tabs-duration') : this.options.animation.duration,
            easing: this.options.animation.easing
          },
          scrollBehavior: this.element.data('tabs-scroll')
        },
        $scrollTarget,
        $parent,
        parentPadding,
        flyoutHeight,
        heightChange;

    // Merge settings with defaults.
    settings = $.extend({}, defaultSettings, settings);

    $contentClone.remove();

    if (!$link.hasClass('is-active')) {
      // Manage active class
      this.options.tabLinks.add(this.element.find(this.options.contents)).removeClass('is-active');
      $link.add($content).addClass('is-active');

      // Not in flyout? Add an animation complete handler to reset the height.
      if (!$flyoutContainer.length && !settings.animation.complete) {
        settings.animation.complete = function () {
          $(this).css({height: 'auto'});
        };
      }

      // Animate the height transition between tabs
      $content.height(previousContentHeight).animate({
        height: contentHeight
      }, settings.animation);

      // Manage flyout container if tabs are within a flyout
      if ($flyoutContainer.length) {
        $parent = $flyoutContainer.offsetParent();
        parentPadding = $parent.outerHeight() - $parent.height();
        flyoutHeight = $flyoutContainer.outerHeight(true);
        heightChange = contentHeight - previousContentHeight;

        // Adjust height of parent
        $parent.animate({
          height: flyoutHeight - parentPadding + heightChange
        }, settings.animation);
      }
    }

    // Handling scrolling behaviors
    if (settings.scrollBehavior) {
      switch (settings.scrollBehavior) {
        case 'wrapper':
          $scrollTarget = this.element;
          break;
        case 'content':
          $scrollTarget = $content;
          break;
        default:
          $scrollTarget = $('#' + settings.scrollBehavior);
          break;
      }

      Components.utils.smoothScrollTop($scrollTarget, settings.animation.duration, scrollOffset, false);
    }

    // Push the current state to the URL
    if ((href.indexOf('#')) === 0 && (href.length > 1) && (history.replaceState)) {
      history.replaceState(undefined, undefined, href);
    }

    // Trigger an event to listen to from other scripts.
    this.element.trigger(pluginName + '.showTab');
  };

  // Automatically reveal content when the ID of the container is in the URL
  // hash.
  Plugin.prototype.autoReveal = function() {
    var hash = window.location.hash,
        $tabLink = this.options.tabLinks.filter('[href=' + hash + ']'),
        scroll = "wrapper",
        $flyoutContainer,
        $flyoutTrigger;

    // Make sure the tab link exists and only run if it's within the current
    // tabs wrapper.
    if ($tabLink.length && this.element.find($tabLink).length) {
      $flyoutContainer = $tabLink.closest('.flyout__content');
      scroll = $flyoutContainer.length ? false : "wrapper";

      // Show the correct tab with quick animation.
      this.showTab($tabLink, {
        animation: {duration:100},
        scrollBehavior : scroll
      });

      // If the tab is inside a content flyout, make sure that the
      // content flyout is opened.
      if ($flyoutContainer.length && !$flyoutContainer.hasClass('is-open')) {
        $flyoutTrigger = $flyoutContainer.data('flyout-trigger');
        $flyoutContainer[0].contentFlyout.showContent($flyoutTrigger, {
          animation: {duration: 0},
          scroll: true,
          scrollDown: true
        });
      }
    }
  };

  // Hand-full of setup tasks
  Plugin.prototype.init = function () {
    var _this = this,
        $flyoutContainer = _this.element.closest('.flyout__content');

    if (_this.options.tabLinks.length && _this.options.contents.length) {

      // Show tabs on click.
      _this.options.tabLinks.on('click.tabs', function(e) {
        _this.showTab($(this));
        e.preventDefault();
      });

      // Set the link's href if it isn't already set.
      _this.options.tabLinks.each(function(index, el) {
        var tabId = $(el).data('tab-content'),
            fragment = '#' + tabId;

        // If we're within a flyout, prefix with the flyout's ID
        if ($flyoutContainer.length) {
          fragment = '#' + $flyoutContainer.attr('id') + '-' + tabId;
        }

        // Set the href for the tab as well as any triggers that target the
        // same content.
        if ($(el).attr('href').indexOf('#') === 0) {
          $(el).attr('href', fragment);
        }
      });

      // Handle other triggers displaying
      if (_this.options.triggers) {
        _this.options.triggers.on('click.tabs-trigger', function (e) {
          var $link = _this.options.tabLinks.filter('[data-tab-content="' + $(this).data('tab-content') + '"]'),
              $content = $('#' + $(this).data('tab-content'));

          if ($link.length) {
            // Manage active class
            _this.options.tabLinks.add(_this.options.contents).removeClass('is-active');
            $link.add($content).addClass('is-active');
          }

          // Push the current state to the URL
          if (history.replaceState) {
            history.replaceState(undefined, undefined, $link.attr('href'));
          }

          e.preventDefault();
        });
      }
    }
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function initPlugin() {
      var plugin = new Plugin(this, options);
      // Allow the plugin to be instantiated more than once. Event handlers
      // will be re-bound to avoid issues.
      $.data(this, 'plugin_' + pluginName, plugin);

      // Expose the plugin so methods can be called externally
      //   Ex. element.tabs.showTab();
      this.tabs = plugin;
    });
  };
})(jQuery);
;
(function ($) {
  $(document).ready(function () {
    $('.auto-suggest').autoSuggest();
  });
})(jQuery);
;
/**
 * Fancy Filters interactions
 */
(function ($) {
  // Bind to document ready and custom components:reattach event so this works on
  // dynamically loaded AJAX content.
  $(document).on('ready components:reattach', function (e, context) {
    $('.fancy-filters')
    // Clear any previously bound handlers.
    .off('click.fancy-filters')
    // Handle "Clear Filters" click by unchecking everything.
    .on('click.fancy-filters', '.fancy-filters__clear', function (e) {
      $(e.delegateTarget).find('input:checked').prop('checked', false).change();
      return false;
    });
  });
})(jQuery);
;
/**
 * Flyout Form component interaction
 * See jquery.contentFlyout.js for details
 */

(function ($) {
  $(document).ready(function() {
    var fragment = 'form',
        $formWrapper = $('.flyout-form'),
        $triggers = $('a[href*="#' + fragment + '"], .flyout-form__trigger'),
        $closeLink = $formWrapper.find('.flyout-form__close'),
        $pageWrapper = $('body');

    // Make sure a flyout form exists before proceding.
    if ($formWrapper.length && $triggers.length) {
      // Append form wrapper to the page wrapper.
      $pageWrapper.append($formWrapper);

      // If a close button doesn't already exist, add it.
      if (!$closeLink.length) {
        $closeLinkWrapper = $('<div class="flyout-form__close-wrapper">');
        $closeLink = $('<a href="#" class="flyout-form__close link link--close">Close</a>');
        $closeLinkWrapper.prepend($closeLink);
        $formWrapper.prepend($closeLinkWrapper);
      }

      // Set the reveal target on the triggers (used by contentFlyout plugin).
      $triggers.data('flyoutTarget', fragment);

      // Flyout Magic using contentFlyout plugin
      $formWrapper.contentFlyout({
        triggers: $triggers,
        slideout: $pageWrapper,
        stayOnTop: true,
        closeLinks: $closeLink,
        scroll: false
      });

      // When open, clicking the page wrapper should close the flyout.
      $pageWrapper.on('click.flyout', function(e) {
        if ($(this).hasClass('is-open')) {
          $formWrapper[0].contentFlyout.hideContent();
          e.preventDefault();
        }
      });

      // Stop propagation of click events on the flyout form itself.
      $formWrapper.on('click.flyout', function (e) {
        e.stopPropagation();
      });

      // Show form on load if the ULR contains the fragment.
      if (window.location.hash === '#' + fragment) {
        // Make sure to only "click" the first trigger."
        $formWrapper[0].contentFlyout.showContent();
      }

      // Close form on hitting Escape key
      $(document).keyup(function(e) {
        if (e.keyCode == 27 && $formWrapper.hasClass('is-open')) { // escape key maps to keycode `27`
          $formWrapper[0].contentFlyout.hideContent();
        }
      });

      // Weird hack to handle iOS's wonky handling of scrolling fixed elements.
      // Forcing a redraw of the form wrapper on blur of form inputs to fix the
      // issue of the form not being scrollable after the keyboard is dismissed.
      // More details here: https://github.com/tableau-mkt/www7/issues/3908
      if ($.ua.os.name === "iOS") {
        $formWrapper.find('input, textarea, select').blur(function(){
          setTimeout(function() {
            $formWrapper.hide().show(0);
          }, 500);
        });
      }

      // Auto-focus on the first field of the form when it's revealed.
      $triggers.on('click.flyout', function(e) {
        // Make sure we're actually listening to a click on the trigger link
        // rather than a JS event trigger.
        if ($(e.currentTarget).is($triggers)) {
          $formWrapper.find('input:visible').first().focus();
        }
      });
    }
  });
}(jQuery));
;
// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

Components.form = {};

Components.form.initFloatLabels = function ($elements) {
  $elements.find('input, select, textarea')
    .not('[type="checkbox"], [type="radio"]')
    .closest('.form-field')
    .floatLabel({
      labelSelector: '.form-field__label'
    });
};

$(document).ready(function () {
  Components.form.initFloatLabels($('.has-float-label'));
});

$(document).on('initFloatLabels', function (e) {
  Components.form.initFloatLabels($(e.target));
});
;
/**
 * Compact form.
 *
 */
(function ($) {
  $(document).ready(function () {
    var fragment = 'form',
        $form = $('.form-compact'),
        $cta = $form.find('button.form__button.cta'),
        $triggers = $('a[href*="#' + fragment + '"]');

    // Make sure a compact form exists before proceeding.
    if ($form.length && $cta.length) {
      // Show form on load if the URL contains the form fragment.
      if (window.location.hash === '#' + fragment) {
        if (isReveal()) {
          revealForm();
        }
        $form.find('input:visible').first().focus();
      }

      $cta.click(function (e) {
        if (isReveal() && !$form.hasClass('is-open')) {
          revealForm();
          return false;
        }

        // Support hidden form submits.
        $(this.form).find('input[type="submit"]').click();

        return false;
      });

      // Auto-focus on the form field when it's revealed.
      $triggers.on('click', function(e) {
        revealForm();
      });

      /**
       * Returns whether this is a reveal.
       * @returns Boolean
       */
      function isReveal() {
        return $form.hasClass('form-compact--reveal');
      }

      /**
       * Reveal the e-mail only form.
       */
      function revealForm() {
        var ctaText = $cta.val() || $cta.text();

        if (!$form.hasClass('is-open')) {
          $form.toggleClass('is-open');
          $cta.text(ctaText);
        }

        $form.find('input:visible').first().focus();
      }
    }
  });
})(jQuery);
;
/**
 * Responsive filters interaction
 *
 * See jquery.dynamicSelectFilters.js
 */
(function ($) {
  $(document).ready(function () {
    $('.responsive-filter').dynamicSelectFilters({
      container: '.responsive-filter__select',
      groupHeading: '.responsive-filter__heading',
      onCreateSelectCallback: function () {
        // 'this' is the jQuery wrapped select element, created per group set.
        this.wrap('<div class="form__select"></div>');
      }
    });
  });
})(jQuery);
;
/**
 * Gif Player utility.
 */
(function($){
  $(document).ready(function(){
    var $gifs = $('.gif-player');

    if ($gifs.length) {
      $gifs.each(function(index, el) {
        var $gif = $(this);

        // Store the static image source
        $gif.data('static-src', $gif.attr('src'));

        // Lazy load in gifs so they start animating after brought into view.
        // Switch back to placeholder when image has exited view.
        //
        // @todo store gif length in a data param and indicate when the gif is
        // being animated vs static. Add a replay button once the loop ends
        var inview = new Waypoint.Inview({
          element: $gif[0],
          entered: function(direction) {
            $gif.attr('src', $gif.data('gif-src'));
          },
          exited: function(direction) {
            $gif.attr('src', $gif.data('static-src'));
          }
        });

      });
    }
  });
})(jQuery);
;
/**
 * Thumbnail colors.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.thumbnail = {};

// Closure to extend behavior, provide privacy and state.
(function (component, $) {
  var i = -1;

  // Available thumbnail colors.
  // @See $thumbnail-colors SASS variable.
  component.colors = ['dark-blue', 'teal', 'light-blue', 'light-orange', 'red', 'yellow'];

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  component.ready = function ($) {
    // Shuffle our colors.
    component.colors = _.shuffle(component.colors);

    // Initialize random unique color for each thumbnail.
    $('.thumbnail--color').not('[class*="thumbnail--color-"]').each(function () {
      $(this).addClass('thumbnail--color-' + component.pickUniqueColor());
    });
  };

  /**
   * Pick a unique color.
   */
  component.pickUniqueColor = function () {
    i++;

    // If no choices are left, start back from the beginning.
    if (i < 0 || i === component.colors.length) {
      i = 0;
    }

    // Pick a color.
    return component.colors[i];
  };

})(Components.thumbnail, jQuery);

// Attach our DOM-ready callback.
jQuery(Components.thumbnail.ready);
;
/**
 * Components.AccordionGrid is a jQuery friendly plugin with an exposed JS API.
 * `component` is an alias for Components.AccordionGrid object, which doubles as
 * the constructor function.
 *
 * State classes:
 *   .is-expanded - An accordion item when it's expanded.
 *
 * On DOM-ready, all elements with the `accordion-grid` class will automatically
 * be instantiated.
 *
 * Initialize yourself using jQuery `.tabAccordionGrid()`:
 *   $('.my-element').tabAccordionGrid();
 *
 * API Examples:
 *   Components.AccordionGrid.closeItems()
 *
 *   var myAccordionGrid = $('.element')[0].AccordionGrid;
 *   myAccordionGrid.openItem();
 *   myAccordionGrid.closeItem();
 *
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a constructor and base object for this component's data and functions.
Components.AccordionGrid = function (element, options) {
  // Set up internal properties.
  this.defaultOptions = {
    itemSelector: '.accordion-grid__item',
    teaserSelector: '.accordion-grid__teaser',
    detailSelector: '.accordion-grid__detail',
    closeClass: 'accordion-grid__close',
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    }
  };
  this.$element = $(element);

  // Use the init options.
  this.options = $.extend({}, this.defaultOptions, options);

  // Initialize this instance.
  this.init();
};

// Closure to encapsulate and provide the component object and jQuery in the local scope.
(function (AccordionGrid, $) {

  /**
   * Component state and variables.
   */
  AccordionGrid.jQueryPluginName = 'tabAccordionGrid';
  AccordionGrid.instances = [];

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  AccordionGrid.ready = function () {
    // Initialize every instance on the page.
    $('.accordion-grid').tabAccordionGrid();
  };

  /**
   * Initialize the component (jQuery plugin).
   */
  AccordionGrid.prototype.init = function () {
    var _this = this,
        $accordionGrid = this.$element,
        $details = $accordionGrid.find(this.options.detailSelector),
        $closeLink = $('<a href="#" class="' + this.options.closeClass + '"><i class="icon icon--close-window-style2"></a>'),
        debouncedTeaserClickHandler;

    // Adding a close link to each detail container.
    // Exclude detail containers which already contain a close link.
    $details.not($details.has('.' + this.options.closeClass)).prepend($closeLink);

    // Debounced function to handle expanding/collapsing of an item's details.
    // Debouncing prevents issues with multiple rapid clicks on itmes.
    debouncedTeaserClickHandler = _.debounce(function () {
      var $item = $(this).closest(_this.options.itemSelector);

      // Expand or collapse the clicked item's details.
      _this.toggleItem($item);
    }, _this.options.animation.duration, true);

    // Handle clicking on the item's teaser and use above debounced function.
    $accordionGrid
    .off('click.accordion-grid-teaser')
    .on('click.accordion-grid-teaser', this.options.teaserSelector, debouncedTeaserClickHandler);

    // Handle closing an item when the close link is clicked.
    $accordionGrid
    .off('click.accordion-grid-close')
    .on('click.accordion-grid-close', '.' + _this.options.closeClass, function (e) {
      var $item = $(this).closest(_this.options.itemSelector);

      _this.closeItem($item);
      e.preventDefault();
    });

    // Auto open an item if a corresponding hash is in the URL
    this.hashOpen();

    // Append to our instances array.
    AccordionGrid.instances.push($accordionGrid);
  };

  /**
   * Toggle a specified item open or closed in a specific instance.
   * @param {jQuery object} $item The item to be toggled
   */
  AccordionGrid.prototype.toggleItem = function ($item) {
    if ($item.hasClass('is-expanded')) {
      this.closeItem($item);
    }
    else {
      this.openItem($item);
    }
  };

  /**
   * Open a specified item in a specific instance.
   * @param {jQuery object} $item - The item to be opened
   * @param {object} settings - Optional override of settings
   */
  AccordionGrid.prototype.openItem = function ($item, settings) {
    var id = $item.attr('id'),
        defaultSettings = {
          animation: this.options.animation
        };

    // Merge settings with defaults.
    settings = $.extend({}, defaultSettings, settings);

    // Collapse any expanded items
    this.closeItems();

    // Expand the specified item's details
    $item.addClass('is-expanded');
    $item.find(this.options.detailSelector).slideHeight('down', settings.animation);

    // Push the current state to the URL
    if ((id.length > 1) && (history.replaceState)) {
      history.replaceState(undefined, undefined, '#' + id);
    }
  };

  /**
   * Close a specified item in a specific instance.
   * @param {jQuery object} $item The item to be closed
   */
  AccordionGrid.prototype.closeItem = function ($item) {
    var hash = window.location.hash;

    if ($item.hasClass('is-expanded')) {
      $item.removeClass('is-expanded');
      $item.find(this.options.detailSelector).slideHeight('up', this.options.animation);
    }

    // Clear the hash of a given item if it's set in the URL
    if (hash.length > 1 && $item.is(hash) && history.replaceState) {
      history.replaceState(undefined, undefined, window.location.pathname);
    }
  };

  /**
   * Close all items in a specific instance
   * @return {jQuery object} collection of all items that were closed.
   */
  AccordionGrid.prototype.closeItems = function () {
    var _this = this,
        $accordionGrid = this.$element,
        $openItems = $accordionGrid.find(this.options.itemSelector).filter('.is-expanded');

    // Collapse all item details and remove state class
    $openItems.each(function () {
      _this.closeItem($(this));
    });

    // Return items that were closed.
    return $openItems;
  };

  /**
   * Check for a hash in the URL and open any corresponding accordion item.
   */
  AccordionGrid.prototype.hashOpen = function () {
    var hash = window.location.hash;

    // If the hash exists (e.g. #something) and it matches using jQuery selection.
    if (hash.length > 1 && this.$element.find(hash).length) {
      this.openItem($(hash), {
        animation: {duration: 0}
      });
    }
  };

  // Lightweight constructor.
  $.fn[AccordionGrid.jQueryPluginName] = function (options) {
    return this.each(function initPlugin() {
      var plugin = new AccordionGrid(this, options);
      $.data(this, 'plugin_' + AccordionGrid.jQueryPluginName, plugin);

      // Expose the plugin so methods can be called externally
      //   e.g., element.AccordionGrid.close();
      this.AccordionGrid = plugin;

      // Trigger custom initialized event on the element.
      $(this).trigger('initialized');
    });
  };

  // DOM-ready handler.
  $(AccordionGrid.ready);

  // AJAX handling magic.
  $(document).on('components:reattach', AccordionGrid.ready);

}(Components.AccordionGrid, jQuery));
;
/**
 * Accordion component interaction
 * See jquery.accordion.js for details
 */

 (function($){
   $(document).ready(function(){
     $('.accordion').each(function () {
       $(this).accordion({
         itemSelector: '.accordion__item',
         headerSelector: '.accordion__title-wrapper',
         contentSelector: '.accordion__content-wrapper'
       });
     });
   });
 })(jQuery);
;
/**
 * Context Switcher component
 */
(function($){
  $(document).ready(function(){
    var $triggers = $('.context-switcher__trigger'),
    $lists = $('.context-switcher__list'),
    animation = {
      duration: 500,
      easing: "easeInOutQuart"
    };
    
    if ($triggers.length && $lists.length) {
      // Run setup
      setup();


      $triggers.on('click.contextSwitcher', function(e) {
        var $trigger = $(this),
            $list = $trigger.closest('.context-switcher').find('.context-switcher__list');

        if ($trigger.hasClass('open')) {
          $list.slideUp(animation);
          $trigger.removeClass('open');
        } else {
          $list.slideDown(animation);
          $trigger.addClass('open');
        }
        e.preventDefault();
      });

      $lists.find('a').on('click.contextSwitcher', function(e) {
        var $option = $(this),
            $list = $option.closest('.context-switcher__list'),
            $trigger = $option.closest('.context-switcher').find('.context-switcher__trigger');

        $trigger.text($option.text());

        $list.slideUp(animation);
        $trigger.removeClass('open');

        $option.parent().addClass('selected').siblings().removeClass('selected');

        e.preventDefault();
      });
    }

  });

  // Hand-full of setup tasks
  function setup() {

  }

})(jQuery);
;
/**
 * Flyout content component interaction
 * See jquery.contentFlyout.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.flyout__content').contentFlyout({
      triggers: $('.flyout__trigger'),
      slideout: $('.flyout__slideout'),
      closeLinks: $('.flyout__close-link')
    });
  });
}( jQuery ));
;
(function($) {
  $(document).ready(function() {

    /**
     * Handles closing the notification.
     */
    $('.global-notification .global-notification__close').click(function (e) {
      e.preventDefault();

      $('.global-notification').slideUp();
    });
  });
})(jQuery);
;
(function($){
  $(document).ready(function(){
    var $heroSlideShow = $('.hero-slideshow');

    if($heroSlideShow.length) {
      $heroSlideShow.slick({
        dots: true,
        arrows: true,
        speed: 650,
        easing: "easeInOutQuart",
        slide: '.hero-slideshow__slide',
        autoplay: true,
        autoplaySpeed: 8000,
        responsive: [
          {
            breakpoint: 639,
            settings: {
              adaptiveHeight: true,
            }
          }
        ]
      });
    }
  });
})(jQuery);
;
/**
 * Loading overlay behaviors.
 *
 * - Show a loading animation w/ overlay.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.loadingOverlay = {};

// Closure to rename Components.modalMessage
(function (component, $) {

  /**
   * Show loading overlay
   *
   * @param {string} $element
   *   The element on which you want to show the loading animation.
   * @param {string} message
   *   Optional message to display in the loading overlay.
   */
  component.show = function ($element, message, modifier) {
    var message = message || 'Loading...',
        $overlay = $('<div class="loading-overlay">' +
          '<div class="loader">' +
          '<div class="loader__animation"></div>' +
          '<div class="loader__message">' + message + '</div>' +
          '</div>' +
          '</div>'),
        offsetY = Components.utils.getElementViewPortCenter($element);
    
    // Allow custom modifier.
    if (modifier) {
      $overlay.addClass(modifier);
    }
    
    $overlay.find('.loader').css('top', offsetY);
    $overlay.prependTo($element)
  };

  /**
   * Hide loading overlay
   *
   * @param {string} $element
   *   The element on which you want to show the loading animation.
   * @param {int} delay
   *   Delay in milliseconds.
   */
  component.hide = function ($element, delay) {
    // Set default to 0 ms.
    delay = delay || 0;

    setTimeout(function () {
      $element.find('.loading-overlay').remove();
    }, delay);
  };

}(Components.loadingOverlay, jQuery));
;
/**
 * Modal message behaviors.
 *
 * - Toggle .is-open state on component, e.g when showing modal message.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.modalMessage = {};

// Closure to rename Components.modalMessage
(function (component, $) {

  /**
   * Variables
   */
  component.modifiers = {
    'loading': 'modal-message--loading'
  };

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  component.ready = function () {
    $('.modal-message, .modal-message__close').click(function (e) {
      if (e.target === this) {
        $('.modal-message').removeClass('is-open');
        e.preventDefault();
      }
    });
  };

  /**
   * Show modal message
   *
   * @param {string} message
   *   Optional message you want to display.
   * @param {string} type
   *   Optional parameter to alter the style of the message box.
   *   Example:
   *   'loading' - Show a loading modal message.
   */
  component.show = function (message, type) {
    var $modalMessage = $('.modal-message');

    // Initialize our modal message;
    if (!$modalMessage.length) {
      $modalMessage = $('<div class="modal-message">' +
        '<div class="modal-message__dialog">' +
        '<div class="modal-message__icon"></div>' +
        '<div class="modal-message__content"></div>' +
        '<a href="#" class="modal-message__close"></a>' +
        '</div>' +
        '</div>');
      $('body').append($modalMessage);
    }

    for (var key in component.modifiers) {
      if (type === key) {
        $modalMessage.addClass(component.modifiers[key]);
      }
      else {
        $modalMessage.removeClass(component.modifiers[key]);
      }
    }

    // Replace the content of our message.
    if (message) {
      component.update(message);
    }

    // Show our modal message.
    if (!$modalMessage.hasClass('is-open')) {
      $modalMessage.addClass('is-open');
    }
  };

  /**
   * Update message.
   *
   * @param {string} message
   *   Message you want to display.
   */
  component.update = function (message) {
    $('.modal-message__content').html(message);
  };

  /**
   * Close modal message
   */
  component.close = function () {
    $('.modal-message').removeClass('is-open');
  };

  // Dom ready handler.
  $(component.ready);

}(Components.modalMessage, jQuery));
;
(function($) {
  $.fn.moveProgressBar = function (progress) {
    var $el = $(this),
        $progress = $el.find('.progress'),
        progress = progress || parseInt($progress.data('progress')) || 0,
        treshold = [5, 50, 100],
        modifier = '';

    for (var i in treshold) {
      if (progress <= treshold[i]) {
        modifier = 'progress--' + treshold[i];
        break;
      }
    }

    // Make sure we have a valid percentage.
    progress = (progress > 100) ? 100 : progress;

    $progress.removeClass (function (index, css) {
      return (css.match (/(^|\s)progress--\S+/g) || []).join(' ');
    }).css({
      'width': progress + '%'
    }).addClass(modifier);
  };
}( jQuery ));
;
/** 
 * Reveal content component interaction
 * See jquery.contentReveal.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.reveal__content').contentReveal({
      triggers: $('.reveal__trigger')
    });
  });
}( jQuery ));
;
/**
 * Scroll Reveal component interaction
 * See https://github.com/jlmakes/scrollreveal for documentation
 */

(function ( $ ) {
  $(document).ready(function(){
    var sequenceIntervalDefault = 100,
        movementDistance = '200px',
        defaultSettings = {
          scale: 1,
          distance: 0,
          duration: 1200,
          easing: 'cubic-bezier(0.77, 0, 0.175, 1)'
        },
        origins = ['left', 'right', 'top', 'bottom'];

    // Initiate Scroll Reveal with some default settings.
    window.scrollReveal = ScrollReveal(defaultSettings);

    // Presets for the different origin modifiers (moving into place from
    // specified direction).
    for (var i = 0; i < origins.length; i++) {
      scrollReveal.reveal('.scroll-reveal--' + origins[i], {
        origin: origins[i],
        distance: movementDistance
      });

      // Because these elements can potentially hang off the side of the page
      // and cause horizontal scrolling, we have to hide overflow on section
      // wrappers.
      $('.scroll-reveal--' + origins[i]).parents('.section').css('overflow-x', 'hidden');
    }

    // Sequenced reveals based on the default interval set above or an interval
    // specified in a data attribute on the container.
    $('.scroll-reveal__sequence-container').each(function() {
      var sequenceDelay = $(this).data('sequence-delay') || 0,
          sequenceInterval = $(this).data('sequence-interval') || sequenceIntervalDefault;

      $(this).find('.scroll-reveal--sequenced').each(function() {
        scrollReveal.reveal(this, {
          delay: sequenceDelay
        });
        sequenceDelay += sequenceInterval;
      });
    });

    // Apply any options applied via data attributes
    $('.scroll-reveal').each(function() {
      scrollReveal.reveal(this, $(this).data());
    });
  });
}( jQuery ));
;
(function ($) {
  $.fn.sonarPulse = function (options) {
    var $el = $(this),
        defaults = {
          // sonarSelector {String}
          // CSS selector identifying the sonar element
          sonarSelector: '.sonar-indicator',

          // sonarElement {jQuery}
          // jQuery object containing the sonar element
          $sonarElement: $('<div class="sonar-indicator"></div>'),

          // timeout {Number}
          // milliseconds before removing the element matching the sonarSelector option
          timeout: 5000,

          // offset {Number} (deprecated)
          // a negative pixel offset from the element's X position
          offset: 5,

          // top/right/bottom/left {String}
          // position properties applied to the sonar element
          top:    '0',
          right:  '0',
          bottom: '0',
          left:   '0',

          // limitDisplayCount {Number}
          // uses localStorage to limit the number of displays (disabled when 0)
          limitDisplayCount: 0,

          // limitDisplayId {String|null}
          // a unique identifier for tracking the display count
          limitDisplayId: null
        },
        padding,
        hasLocalStorage,
        displayCount;

    // Handle deprecated options.
    if (options) {
      // Handle deprecated offset option.
      if (options.offset) {
        padding = parseInt($el.css('padding-left').replace('px', ''));
        // left replaces offset, ignoring padding, and negated.
        options.left = ((padding / 2) - options.offset) + 'px';
      }
    }

    // Extend defaults without overwriting them.
    options = $.extend({}, defaults, options);

    // Limit displays by count using localStorage API. Ignore if localStorage is not supported.
    hasLocalStorage = window.localStorage
      && typeof localStorage.getItem === 'function'
      && typeof localStorage.setItem === 'function';

    // Check localStorage support and if we are limiting the display count
    if (hasLocalStorage && options.limitDisplayId && options.limitDisplayCount > 0) {
      displayCount = localStorage.getItem('sonarPulseCount_' + options.limitDisplayId) || 0;
      // Stop here if we display count is greater than or equal to the allowed count.
      if (displayCount >= options.limitDisplayCount) {
        return;
      }
      // Save the latest value to localStorage.
      localStorage.setItem('sonarPulseCount_' + options.limitDisplayId, ++displayCount);
      // Trigger a custom event so other JS can do stuff.
      $el.trigger('sonar:activate');
    }

    // Apply positioning to the sonar element.
    options.$sonarElement.css({
      top: options.top,
      right: options.right,
      bottom: options.bottom,
      left: options.left
    });

    // Add the sonar element, ensuring only one exists.
    $el.remove(options.sonarSelector).prepend(options.$sonarElement);

    // If timeout is non-zero, remove after delay.
    if (options.timeout > 0) {
      // Remove our sonar pulse after 5 seconds.
      setTimeout(function () {
        $el.find(options.sonarSelector).remove();
        // Trigger a custom event so other JS can do stuff.
        $el.trigger('sonar:deactivate');
      }, options.timeout);
    }
  };

  // Auto-initialize on DOM ready with .sonar-pulse class.
  // Provide options using data-sonar-options attribute and JSON string:
  // data-sonar-options='{"sonarSelector": ".sonar-indicator", "timeout": 5000, "offsetY": "-10", "limitDisplayCount": 1, "limitDisplayId": "cool-thing"}'
  $(function () {
    $('.sonar-pulse').each(function () {
      var $el = $(this);

      $el.sonarPulse($el.data('sonarOptions') || {});
    });
  })
}(jQuery));
;
(function($) {
  $(document).ready(function() {

    /**
     * Allows making an element sticky on the page with just a 'sticky' class.
     */
    $('.sticky').each(function(i) {
      stickIt(this);
    });

    // For less capable browsers, only execute sticky on desktop.
    if (!window.matchMedia || $('.lt-ie9').length) {
      $('.sticky--desktop').each(function(i) {
        stickIt(this);
      });
      return;
    }

    if (Components.utils.breakpoint('desktop')) {
      $('.sticky--desktop').each(function(i) {
        stickIt(this);
      });
    }

    if (Components.utils.breakpoint('tablet')) {
      $('.sticky--tablet').each(function(i) {
        stickIt(this);
      });
    }

    if (Components.utils.breakpoint('mobile')) {
      $('.sticky--mobile').each(function(i) {
        stickIt(this);
      });
    }
  });

  function stickIt(el) {
    var sticky = new Waypoint.Sticky({
      element: el
    });
  }
})(jQuery);
;
/**
 * Tabs component interaction
 * See jquery.tabs.js for details
 */

(function ($) {
  $(document).ready(function () {
    $('.tabs__wrapper').each(function () {
      var $this = $(this),
          $triggers = $this.find('.tabs__tab-trigger'),
          $flyoutTriggers = $this.closest('.flyout__content').siblings('.flyout__slideout').find('.tabs__tab-trigger');

      $this.tabs({
        tabLinks: $this.find('.tabs__tab-link'),
        contents: $this.find('.tabs__tab-content'),
        triggers: $triggers.add($flyoutTriggers)
      });
    });
  });
}(jQuery));
;
/**
 * Card wall fixes for off-by-one errors.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.cardWall = {
  isMasonryActive: true
};

// Closure to extend behavior, provide privacy and state.
(function (component, $) {

  /**
   * jQuery ready callback.
   */
  component.ready = function ($) {
    // Only if masonry and a card-wall element exists.
    if (typeof $.fn.masonry !== 'function' || !$('.card-wall').length) {
      return;
    }

    // Attach resize handler using underscore's debounce.
    $(window).on('resize', component.resizeHandler);
  };

  /**
   * Window resize handler.
   */
  component.resizeHandler = _.debounce(function() {
    $('.card-wall .card').each(function () {
      // Set the rounded up computed height to adjust for rounding errors.
      $(this).height('auto');
      $(this).height(Math.ceil($(this).height()));
    });

    // Check the breakpoint to decide whether to disable or re-enable and re-layout.
    component.checkBreakpoint();
  }, 100);

  /**
   * Check breakpoint to toggle Masonry.
   */
  component.checkBreakpoint = function () {
    var $cardWall = $('.card-wall'),
      masonryConfig = $cardWall.data('masonry');

    // Disable masonry on mobile. Otherwise, re-enable it.
    if (Components.utils.breakpoint('mobile')) {
      // Needs to be disabled?
      if (component.isMasonryActive) {
        $cardWall.masonry('destroy');
        // Flag that we've destroyed the masonry instance.
        component.isMasonryActive = false;
      }
    }
    else {
      // Needs to be re-enabled?
      if (!component.isMasonryActive) {
        // Remove the existing data so that masonry doesn't blow up.
        $cardWall.removeData('masonry');
        // Initialize with the config we found on the data attribute.
        $cardWall.masonry(masonryConfig);
        // Flag that this masonry instance is active.
        component.isMasonryActive = true;
      }
      else {
        // Re-layout the masonry items since the instance is active.
        $cardWall.masonry();
      }
    }
  };

})(Components.cardWall, jQuery);


// Attach our DOM-ready callback.
jQuery(Components.cardWall.ready);
;
(function ($) {
  // Bind to document ready and custom components:reattach event so this works on
  // dynamically loaded AJAX content.
  $(document).on('ready components:reattach', function (e, context) {

    /**
     * Handles making the whole row clickable
     * Makes the assumption that there exists exactly one .table-list__link in a
     * --clickable-row
     */
    $('.table-list--clickable-row tbody tr')
    .off('click.tableList')
    .on('click.tableList', function (e) {
      var $tlink = $(this).find('.table-list__link a'),
          loc = $tlink.attr('href'),
          target = $tlink.attr('target');

      // Prevent clicking link in row from triggering event twice
      e.preventDefault();

      // If there is no given target, open in the same window using _self
      if (!target) {
        target = '_self';
      }

      window.open(loc, target);
    });
  });
})(jQuery);
;
/**
 * Brightcove video chapter handling.
 *
 * This handles chaptering interaction given an expected DOM structure. E.g.:
 * <ul class="video__chapters" data-chapters-for="[VIDEO DOM ID]">
 *   <li class="video__chapter" data-timestamp="60">Something</li>
 *   <li class="video__chapter" data-timestamp="120">Something else</li>
 * </ul>
 *
 * It listens for a brightcove:ready event that is raised per video instance as
 * it successfully creates a Brightcove videojs wrapped player object.
 */
(function ($, window) {
  $(document).ready(function () {
    var $chapterLists = $('[data-chapters-for]');

    // Bail early if there aren't even any lists of chapters.
    if (!$chapterLists.length || !typeof window.videojs === 'function') {
      return;
    }

    // Utilize the revealContent plugin.
    $chapterLists.each(function initChapterReveal() {
      $(this).contentReveal({
        triggers: $(this).next('.video-chapters__toggle-wrapper').find('.video-chapters__toggle'),
        closeLink: false
      });
    });

    // The Brightcove player binding is async. We wait for a raised event first
    // before binding the video chapter actions.
    $(document).on('brightcove:ready', function (e, data) {
      // The 'data' received here is the id attribute of the video player element.
      var $readyChapters = $chapterLists.filter('[data-chapters-for="' + data + '"]'),
          $videoElement = $('#' + data),
          BCPlayer = $videoElement.data('bcPlayer');

      // Bail early.
      if (!$readyChapters.length) {
        return;
      }

      $readyChapters.find('.video-chapters__chapter').on('click.chapter', function triggerVideoChapter (e) {
        var $this = $(this),
            timestamp = $this.data('timestamp');

        e.preventDefault();

        // Set the play time.
        BCPlayer.currentTime(timestamp);

        // Scroll.
        Components.utils.smoothScrollTop($videoElement);

        // Play the video if it ain't playing.
        if (BCPlayer.paused()) {
          BCPlayer.play();
        }
      });
    });

  });
})(jQuery, window);
;
/**
 * Components.DropdownNav is a jQuery friendly plugin with an exposed JS API.
 * `component` is an alias for Components.DropdownNav object, which doubles as the
 * constructor function.
 *
 * State classes:
 *   .is-open - the component when expanded / open.
 *
 * On DOM-ready, all elements with the `dropdown-nav` class will automatically be
 * instantiated.
 *
 * Initialize yourself using jQuery `.tabDropdownNav()`:
 *   $('.my-element').tabDropdownNav();
 *
 * API Examples:
 *   Components.DropdownNav.closeAll()
 *
 *   var myDropdownNav = $('.element')[0].DropdownNav;
 *   myDropdownNav.close();
 *   myDropdownNav.open();
 *
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a constructor and base object for this component's data and functions.
Components.DropdownNav = function (element, options) {
  // Set up internal properties.
  this.defaultOptions = {};
  this.$element = $(element);

  // Use the init options.
  this.options = $.extend({}, this.defaultOptions, options);

  // Initialize this instance.
  this.init();
};

// Closure to encapsulate and provide the component object and jQuery in the local scope.
(function (DropdownNav, $) {

  /**
   * Component state and variables.
   */
  DropdownNav.jQueryPluginName = 'tabDropdownNav';
  DropdownNav.instances = [];

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  DropdownNav.ready = function () {
    // Initialize every instance on the page.
    $('.dropdown-nav').tabDropdownNav();

    // Close all instances when tapping "outside" or when ESC key is pressed.
    $(document).on('touchstart.dropdownNav', function (e) {
      DropdownNav.closeAll();
    })
    .on('keydown.dropdownNav', function (e) {
      if (e.keyCode === 27) {
        DropdownNav.closeAll();
      }
    });
  };

  /**
   * Initialize the component (jQuery plugin).
   */
  DropdownNav.prototype.init = function () {
    var $dropdownNav = this.$element;

    // Handle clicks on the body element. Prevent bubbling up to the document.
    $dropdownNav.find('.dropdown-nav__body').on('touchstart.dropdownNav', function (e) {
      e.stopPropagation();
    });

    // Handle clicks on the toggle element.
    $dropdownNav.find('.dropdown-nav__toggle').on('touchstart.dropdownNav', function (e) {
      // Prevent bubbling up which results in a closeAll().
      e.stopPropagation();

      $dropdownNav.toggleClass('is-open');
    });

    // Handling for hover interaction of dropdown navs.
    //
    // Uses the doTimeout jQuery utility to handle throttling and waiting on a small delay
    // before showing the drawer (essentially hoverintent).
    $dropdownNav.hover(function () {
      $dropdownNav.doTimeout('open', 200, function () {
        $dropdownNav.addClass('is-open');
      });
    }, function () {
      $dropdownNav.doTimeout('open', 200, function () {
        $dropdownNav.removeClass('is-open');
      });
    });

    // Append to our instances array.
    DropdownNav.instances.push($dropdownNav);
  };

  /**
   * Open a specific instance.
   */
  DropdownNav.prototype.open = function () {
    this.$element.addClass('is-open');
  };

  /**
   * Close a specific instance.
   */
  DropdownNav.prototype.close = function () {
    this.$element.removeClass('is-open');
  };

  /**
   * Close all open instances, e.g., on blur.
   */
  DropdownNav.closeAll = function () {
    $.each(DropdownNav.instances, function (index, $dropdownNav) {
      $dropdownNav.removeClass('is-open');
    });
  };

  // Lightweight constructor, preventing against multiple instantiations
  $.fn[DropdownNav.jQueryPluginName] = function (options) {
    return this.each(function initPlugin() {
      var plugin = new DropdownNav(this, options);
      // Allow the plugin to be instantiated more than once. Event handlers
      // will be re-bound to avoid issues.
      $.data(this, 'plugin_' + DropdownNav.jQueryPluginName, plugin);

      // Expose the plugin so methods can be called externally
      //   e.g., element.DropdownNav.close();
      this.DropdownNav = plugin;

      // Trigger custom initialized event on the element.
      $(this).trigger('initialized');
    });
  };

  // DOM-ready handler.
  $(DropdownNav.ready);

}(Components.DropdownNav, jQuery));
;
(function ($) {
  /**
   * Callback function to insert the menu into the DOM.
   */
  window.tabAjaxMegaMenu = function (data) {
    var commands = {
      insert: function (response) {
        $(response.selector)[response.method](response.data);
      }
    };

    // Execute our commands.
    for (var i in data) {
      if (data[i]['command'] && commands[data[i]['command']]) {
        commands[data[i]['command']](data[i]);
      }
    }

    // Trigger event when our menu has been loaded.
    $(document).trigger('tabAjaxMegaMenu:ready');

    // Attach customer menu behaviors when it's ready.
    if (typeof $.fn.tabDropdownNav === 'function') {
      $('.dropdown-nav').tabDropdownNav();
    }
  };
})(jQuery);
;
/**
 * Global gavigation interactions
 */
(function($){
  /**
   * Wait for custom event 'tabAjaxMegaMenu:ready' (i.e. menu drawers are fully loaded
   * via AJAX callback) before initiating mega menu client side behavior. If the drawers
   * are not being loaded via AJAX, the following snippet can be used to call the trigger
   *
   * $(document).ready(function() {
   *    $(document).trigger('tabAjaxMegaMenu:ready');
   * });
   *
   */
  $(document).one('tabAjaxMegaMenu:ready', function tabAjaxMenuReady() {
    var $globalNav = $('.global-nav__top'),
        $expandableLinks = $globalNav.find('[data-drawer-id]'),
        $drawersWrapper = $('.global-nav__drawers'),
        $drawers = $('.global-nav__drawer'),
        $hamburger = $globalNav.find('.hamburger'),
        $mobileWrapper = $globalNav.find('.global-nav__mobile-wrapper'),
        $mobileDrawerClose = $('.global-nav__drawer-close'),
        animation = {
          duration: 500,
          easing: "easeInOutQuart"
        };

    // Do some initial sizing.
    sizing();

    // Size on window resize and orientation change.
    $(window).on('resize orientationchange', _.debounce(sizing, 100));

    // Desktop stuff.
    // Drawer Expanding interaction
    $expandableLinks.each(function (){
      // Exclude dropdown nav toggle element since it does its own thing for desktop.
      var $link = $(this).not('.dropdown-nav__toggle'),
          $drawer = $drawers.filter('#' + $link.data('drawer-id')),
          $both = $link.add($drawer);

      // Handling for hover interaction of drawers. Uses the doTimeout jquery
      // utility to handle throttling and waiting on a small delay before
      // showing the drawer (essentially hoverintent)
      $both.hover(function () {
        $both.doTimeout('open', 200, function() {
          $both.addClass('is-open');
        });
      }, function () {
        $both.doTimeout('open', 200, function() {
          $both.removeClass('is-open');
        });
      });

      // Touch-only device interaction: first click (tap) opens the drawers.
      // Subsequent clicks follows UA default behavior (i.e. follows the top-
      // level link). But, only on desktop menu style!
      $link.on('touchstart.global-nav', function (e) {
        // Ignore if not desktop breakpoint.
        if (!Components.utils.breakpoint('desktop')) {
          return;
        }
        // If not already open, prevent following the link, and stop
        // propagation so that our sister document touch handler doesn't close
        // the drawers immediately.
        if (!$link.hasClass('is-open')) {
          e.preventDefault();
          e.stopPropagation();
        }
        $expandableLinks.add($drawers).removeClass('is-open');
        $both.addClass('is-open');
      });
    });

    // Catch touch events bubbling "all the way up" as a trigger for closing the
    // drawers (on mobile specifically).
    $(document).on('touchstart.global-nav', function () {
      $expandableLinks.add($drawers).removeClass('is-open');
    });

    // Don't bubble up events beyond drawers.
    // This prevents touch events inside the drawers from closing the drawers.
    // @todo document why stopping click propagation is necessary.
    $drawers.on('touchstart.global-nav click.global-nav', function(e) {
      e.stopPropagation();
    });

    // Tablet/mobile stuff.
    $expandableLinks.on('click.global-nav', function(e) {
      var $link = $(this),
          $drawer = $('#' + $link.data('drawer-id'));

      if (Components.utils.breakpoint('tablet') || Components.utils.breakpoint('mobile')) {
        $drawersWrapper.addClass('is-open');
        $drawer.show().addClass('mobile-open');

        $drawer.add($mobileWrapper).animate({
          marginLeft: '-=100%'
        }, animation);

        e.preventDefault();
      }
    });

    $mobileDrawerClose.on('click.global-nav', function(e) {
      var $drawer = $(this).closest('.global-nav__drawer');

      closeDrawerMobile($drawer);

      e.preventDefault();
    });

    // Mobile menu
    $hamburger.on('click.global-nav', function(e) {
      var $openDrawer = $drawers.filter('.mobile-open');

      if ($openDrawer.length) {
        $drawersWrapper.removeClass('is-open');
        setTimeout(function() {
          $openDrawer.css('margin-left', '100%').hide().removeClass('mobile-open');
          $mobileWrapper.css('margin-left', '0%');
        }, 500);
      }

      $mobileWrapper.toggleClass('is-open');
      $hamburger.parent().toggleClass('open');
      e.preventDefault();
    });

    function closeDrawerMobile($drawer) {
      $drawer.add($mobileWrapper).animate({
        marginLeft: '+=100%'
      }, animation);


      setTimeout(function() {
        $drawersWrapper.removeClass('is-open');
        $drawer.hide().removeClass('mobile-open');
      }, animation.duration);
    }

    // Prepare our menu for the user's viewport.
    function sizing() {
      // Tablet/Mobile
      if (Components.utils.breakpoint('tablet') || Components.utils.breakpoint('mobile')) {
        // Adjust the height of the mobile menu
        mobileHeightAdjust();

        // Delay adding this class to prevent CSS transitions from firing when
        // switching from desktop to tablet/mobile.
        setTimeout(function() {
          $mobileWrapper.addClass('is-mobile');
        }, animation.duration);
      }
      // Desktop
      else {
        // Remove any mobile markup, and revert to original settings.
        $hamburger.removeClass('hamburger--open');
        $hamburger.parent().removeClass('open');
        $mobileWrapper.removeAttr('style').removeClass('is-mobile is-open');
        $drawers.removeAttr('style').removeClass('open');
      }
    }

    // Adjust the height of the mobile menu to take up the entire height.
    function mobileHeightAdjust() {
      // @todo this is pretty bad... Can probably figure out a clever CSS hack to
      // achieve this with vh units or something.
      var drawerHeight = $(window).outerHeight(true) - $globalNav.outerHeight(true);

      $mobileWrapper.add($drawers).each(function(index, el) {
        var $wrapper = $(el),
            origHeight = $wrapper.data('orig-height');

        if (isNaN(origHeight)) {
          origHeight = $wrapper.height();
          $wrapper.data('orig-height', origHeight);
        }

        if (origHeight < drawerHeight) {
          $wrapper.height(drawerHeight);
        }
      });
    }
  });

})(jQuery);
;
/**
 * Global search bar interaction
 */
(function ($) {
  $(document).ready(function () {
    var $globalNav = $('.global-nav'),
        globalNavData = $globalNav.data(),
        $searchWrapper = $('.global-nav__search'),
        $closeSearch = $('.global-nav__search-close'),
        animation = {
          duration: 500,
          easing: "easeInOutQuart"
        };

    // External sites can override the search submit to redirect to www.tableau.com's
    // search page, using the data-www-search="all" type data attribute.
    if (globalNavData && globalNavData.wwwSearch) {
      $searchWrapper.find('input[type="search"]')
      .on('submit-search.globalSearch', function () {
        window.location = 'https://www.tableau.com/search/' + globalNavData.wwwSearch + '/' + encodeURIComponent($(this).val());
      })
      .on('keydown.globalSearch', function (e) {
        if (e.keyCode === 13) {
          $(this).trigger('submit-search');
        }
      })
    }

    // Bind the click event on the global-nav, in case the target element is AJAX-loaded.
    $globalNav.on('click', '.global-nav__search-toggle', function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
      $searchWrapper.fadeIn(animation);
      $(this).parents('.global-nav__top').addClass('global-nav--search-shown');

      // Make sure to focus the search field when opened.
      $searchWrapper.find('input[form="coveo-dummy-form"], input[type="search"]').focus();
    });

    $closeSearch.on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      $searchWrapper.parents('.global-nav__top').removeClass('global-nav--search-shown');
      $searchWrapper.fadeOut(animation);
    });
  });
})(jQuery);
;
/**
 * Hamburger interaction interactions
 */
(function($){
  $(document).ready(function(){
    var $hamburger = $('.hamburger');

    if ($hamburger.length) {
      $hamburger.on('click.hamburger', function(e) {
        $(this).toggleClass('hamburger--open');
        e.preventDefault();
      });
    }
  });
})(jQuery);
;
/**
 * Interactions for Section Nav component.
 */
(function($) {
  $(document).ready(function() {
    var $nav = $('.section-nav'),
        $title = $nav.find('.section-nav__title, .block__title'),
        $menu = $nav.find('.section-nav__menu, .menu-block-wrapper > ul.menu'),
        animation = {
          duration: 500,
          easing: "easeInOutQuart"
        },
        sticky;

    if ($nav.length) {
      // Handle opening/closing menu on mobile/tablet
      $title.on('click', function(e) {
        if (Components.utils.breakpoint('tablet') || Components.utils.breakpoint('mobile')) {
          $nav.toggleClass('is-open');
          $menu.slideToggle(animation);
          e.preventDefault();
        }
      });

      // Handle opening/closing menu on mobile/tablet
      $nav.on('click', function(e) {
        if (e.target === this && (Components.utils.breakpoint('tablet') || Components.utils.breakpoint('mobile'))) {
          $nav.toggleClass('is-open');
          $menu.slideToggle(animation);
          e.preventDefault();
        }
      }).end()
      // There are cases where the links in a section nav do not actually link anywhere, so the
      // behavior here is to treat the link like an <option> element: clicking the link closes the nav.
      .find('a').on('click', function(e) {
        if (!$(this).attr('href') && (Components.utils.breakpoint('tablet') || Components.utils.breakpoint('mobile'))) {
          e.preventDefault();
          $nav.removeClass('is-open');
          $menu.slideUp(animation);
        }
      });

      // Sticky nav on mobile/tablet
      if (!Components.utils.breakpoint('desktop')) {
        sticky = new Waypoint.Sticky({
          element: $nav
        });
      }
    }
  });
})(jQuery);
;
/**
 * Sidebar nav  interaction including scroll-aware highlighting
 */

(function($){
  $(document).ready(function(){
    var $subnav = $('.subnav'),
        $links = $subnav.find('.subnav__links'),
        $linksWrapper = $links.find('.subnav__links-wrapper'),
        $anchors = $('.anchor-link');

    if ($links.length && $anchors.length) {
      $anchors.waypoint({
        handler: function(direction) {
          var id = this.element.id;
          if (direction === 'down') {
            $links.find('a[href="#' + id + '"]').parent().addClass('is-active').siblings().removeClass('is-active');
          } else if (direction === 'up') {
            $links.find('a[href="#' + id + '"]').parent().prev().addClass('is-active').siblings().removeClass('is-active');
          }
        },
        offset: $subnav.outerHeight(true)
      });

      // Handle scrolling of links on mobile if they are present.
      if ($linksWrapper.length) {
        mobileScroll();
        $(window).on('resize orientationchange', _.debounce(mobileScroll, 100));
      }

      // Smooth Scroll for anchor links
      // @TODO generalize and separate from this component
      $links.find('a').not('.subnav__cta a').click(function(e) {
        var element = $(this).attr('href'),
            offset = $subnav.outerHeight(true) - 1;

        // Offset for mobile
        if ($subnav.find(".sticky-wrapper").length) {
          offset = $subnav.find(".sticky-wrapper").outerHeight(true) - 1;
        }

        Components.utils.smoothScrollTop($(element), 500, offset);
        e.preventDefault();
      });
    }

    // Manage scroll fading on mobile if there's overflow.
    function mobileScroll() {
      var width = $linksWrapper[0].offsetWidth,
          scrollWidth = $linksWrapper[0].scrollWidth;

      if (width < scrollWidth) {
        // Add right fade right away since we always start on the left.
        $links.addClass('fade-right');

        $linksWrapper.scroll(function () {
          var scrollPos = $linksWrapper.scrollLeft();

          // Add both fades and then remove below if needed.
          $links.addClass('fade-right fade-left');

          // Remove right fade when scrolled all the way to the right
          if (scrollPos === (scrollWidth - width)) {
            $links.removeClass('fade-right');
          }
          // Remove left fade when scrolled all the way to the left
          if (scrollPos === 0) {
            $links.removeClass('fade-left');
          }
        });
      } else {
        $links.removeClass('fade-left fade-right');
      }

    }
  });
})(jQuery);
;
/**
 * Topic Navigation interaction
 * Requires jquery.contentReveal.js and jquery.tabs.js
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Declare this component's namespace.
Components.topicNav = {};

/**
 * Topic Navigation DOM-ready callback.
 */
Components.topicNav.init = function ($) {
  var $tabLinks = $('.topic-nav__tabs a'),
      $revealToggle = $('.topic-nav__toggle');
  // Tabs integration
  $('.topic-nav').tabs({
    tabLinks: $tabLinks,
    contents: $('.topic-nav__drawer')
  });

  // contentReveal interaction
  $('.topic-nav__drawers').contentReveal({
    triggers: $revealToggle,
    closeLink: false
  });

  // Custom tweaks
  $revealToggle.on('click.topic-nav', function (e) {
    var $parentNav = $(this).closest('.topic-nav'),
        $drawersContainer = $(this).closest('.topic-nav').find('.topic-nav__drawers');

    if ($drawersContainer.data('revealState') === 'open') {
      $parentNav.find('.topic-nav__tabs a').eq(0).trigger('click').addClass('is-active');

      // @todo Change out the setTimeout
      // Wrapped in a setTimeout because an instant toggle means drawer content can show up and
      // overlap content on lower z-index before the animation completes.
      setTimeout(function () {
        $drawersContainer.addClass('is-open');
      }, 1000);
    }
    else {
      $parentNav.find('.topic-nav__tabs a').removeClass('is-active');
      $drawersContainer.removeClass('is-open');
    }
  });

  $tabLinks.on('click.topic-nav', function (e) {
    var $toggle = $(this).closest('.topic-nav').find('.topic-nav__toggle'),
        $drawersContainer = $(this).closest('.topic-nav').find('.topic-nav__drawers');

    if ($drawersContainer.data('revealState') === 'closed') {
      $toggle.trigger('click.reveal');

      // @todo Change out the setTimeout
      setTimeout(function () {
        $drawersContainer.addClass('is-open');
      }, 1000);
    }
  });

  // Unset any IDs added by the tabs or content reveal plugins to avoid some
  // funky behavior.
  $tabLinks.add($revealToggle).each(function(index, el) {
    if ($(el).attr('href').indexOf('#') === 0) {
      $(el).attr('href', '#');
    }
  });

  // Set active tab to topic query param on DOM-ready.
  Components.topicNav.setActiveTab(Components.utils.getUrlParams().topic);
};

/**
 * Set the active tab.
 *
 * @param {String} topic ID
 *
 * @return {Boolean} whether matching content was found on the page.
 */
Components.topicNav.setActiveTab = function (topic) {
  var $matchingContent = $('[data-tab-content="' + topic + '"]');

  // Trigger a click on any matching elements.
  $matchingContent.click();

  return $matchingContent.length > 0;
};

// Bind DOM-ready callback.
$(document).ready(Components.topicNav.init);
;
/**
 * News Banner interaction
 */

(function ($) {
  $(document).ready(function() {
    var $banner = $('.news-banner'),
        $placeholder = $banner.clone(),
        id = $banner.attr('id'),
        $closeLink = $banner.find('.news-banner__close a'),
        isDismissed = $.cookie('news-banner-' + id),
        animation = {
          duration: 500,
          easing: "easeInOutQuart"
        };

    // Only show if the message hasn't been dismissed before or if it's forced
    // with a URL fragment.
    if (!isDismissed || window.location.hash === '#banner') {
      $banner.addClass('is-active');

      // Use a clone of the banner as a placeholder to manage the height of the
      // banner. This is necessary because the banner is fixed position and
      // removed from the document flow. Avoids managing height with a resize
      // event listener.
      $placeholder.addClass('news-banner__clone');

      $banner.after($placeholder);

      // Short delay for a more prominent "entrance" and to help the background
      // image load more before display.
      $placeholder.delay(500).slideDown(animation);
    }

    // Close banner when close link is clicked.
    $closeLink.click(function(e) {
      // Animate the placeholder height to hide the banner and then make sure
      // the banner and placeholder are completely hidden.
      $placeholder.slideUp($.extend(animation, {
        complete: function () {
          $banner.add($placeholder).removeClass('is-active');
        }
      }));

      // Set a cookie to indicate the user has dismissed the banner.
      // Expires after 2 weeks to safe-guard against someone adding a new
      // banner with an old ID.
      $.cookie('news-banner-' + id, 1, { expires: 14 });

      e.preventDefault();
    });
  });
}( jQuery ));
;
/**
 * Content search behaviors.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.contentSearch = {};

// Closure to extend behavior, provide privacy and state.
(function (component, $) {

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  component.ready = function ($) {
    // Initialize content search components, excluding contextual search.
    $('.content-search').not('.contextual-search').each(function () {
      component.initialize($(this));
    });
  };

  /**
   * Initialize component.
   * - Binds contentSearch event handlers, and unbinds any existing ones.
   */
  component.initialize = function ($search) {
    // Attach keydown handler with context.
    $search.find('.content-search__input')
      .off('keydown.contentSearch')
      .on('keydown.contentSearch', $.proxy(Components.contentSearch.keydownHandler, $search)
    );

    // Attach reset click handler to component.
    $search.find('.content-search__reset')
      .off('click.contentSearch')
      .on('click.contentSearch', function () {
        // Allow overriding.
        var resetEvent = $.Event('contentSearch:reset');
        $search.trigger(resetEvent);
        if (!resetEvent.isDefaultPrevented()) {
          // Reset/empty the form, via AJAX.
          component.resetForm($search);
        }
      });
  };

  /**
   * Carry out the form reset.
   *
   * @param {jQuery Object} $search
   */
  component.resetForm = function ($search) {
    $search.find('.content-search__input').val('');
  };

  /**
   * Carry out the form submit.
   *
   * @param {jQuery Object} $search
   */
  component.submitForm = function ($search) {
    if ($search.find('.content-search__input').val() !== '') {
      $search.find('.content-search__submit').click();
    }
  };

  /**
   * Keydown handler.
   *
   * @param {Object} event
   */
  component.keydownHandler = function (event) {
    var $search = $(this[0]),
        submitEvent = $.Event('contentSearch:submit');

    switch (event.which) {
      case 13: // ENTER
        // Allow overriding.
        $search.trigger(submitEvent);
        // Submit the form, via AJAX.
        if (!submitEvent.isDefaultPrevented()) {
          // Prevent any further events from occurring on the input.
          $search.find('.content-search__input').prop('readonly', true)
            .off('keyup keydown blur');
          Components.contentSearch.submitForm($search);
        }
        event.preventDefault();
        break;
    }
  };

})(Components.contentSearch, jQuery);

// Attach our DOM-ready callback.
jQuery(Components.contentSearch.ready);
;
/**
 * Section search behaviors.
 *
 * - Toggle .is-open state on component, e.g., upon AJAX search result.
 * - Handle down/up arrow keys on pick list
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.contextualSearch = {};

/**
 * DOM-ready callback.
 *
 * @param {Object} $
 *   jQuery
 */
Components.contextualSearch.ready = function ($) {
  // Set up all the section search components on the page.
  $('.contextual-search').each(function () {
    var $this = $(this),
        // Initialze a data object for this instance.
        search = {
          selectionIndex: -1,
          // Save a reference to this element.
          element: this
        };
    // Attach keydown handler with our data context.
    $this.keydown($.proxy(Components.contextualSearch.keydownHandler, search));
    // Attach UI click handler. Don't propagate clicks to document.
    $this.find('.contextual-search__ui').click(function (event) {
      event.stopPropagation();
    });
    // Attach document click handler to close (blur) the results list.
    $(document).click(function contextualSearchBlur() {
      $(search.element).removeClass('is-open');
    });
    // Attach reset handler.
    $this.find('.content-search__reset').click(function contextualSearchReset() {
      $(search.element).removeClass('is-open');
    });
  });
};

/**
 * Keydown handler.
 *
 * @param {Object} event
 */
Components.contextualSearch.keydownHandler = function (event) {
  // Only handle keys when the results list is open.
  if (!$(this.element).hasClass('is-open')) {
    return;
  }

  switch (event.which) {
    case 38: // UP
      Components.contextualSearch.select.call(this, -1);
      break;
    case 40: // DOWN
      Components.contextualSearch.select.call(this, 1);
      break;
    case 27: // ESCAPE
      $(this.element).removeClass('is-open');
      break;
    case 13: // ENTER
      event.preventDefault();
      Components.contextualSearch.select(0);
      if (this.selectionIndex >= 0) {
        this.$rows.get(this.selectionIndex).click();
      }
      break;
  }
};

/**
 * Set the row selection up/current/down.
 *
 * @param {Number} direction
 *   -1, 0, or 1
 */
Components.contextualSearch.select = function (direction) {
  this.$rows = $(this.element).find('.contextual-search__results-row');
  this.selectionIndex += direction;
  this.selectionIndex = Math.max(this.selectionIndex, 0);
  this.selectionIndex = Math.min(this.selectionIndex, this.$rows.length - 1);
  this.$rows.removeClass('is-selected')
    .eq(this.selectionIndex).addClass('is-selected');
};

// Attach our DOM-ready callback.
jQuery(Components.contextualSearch.ready);
;
/**
 * Search Facet behaviors.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.searchFacet = {
  collapsedClass: 'coveo-facet-collapsed'
};

// Closure to extend behavior, provide privacy and state.
(function (component, $) {

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  component.ready = function ($) {
    // Close open search facets when clicking outside of one, or when ESC key is pressed.
    $(document).on('click.searchFacet', function (e) {
      component.closeAll();
    })
    // Also, close on Escape key.
    .on('keydown', function (e) {
      if (e.keyCode === 27) {
        component.closeAll();
      }
    });

    // Initialize search facet components.
    $('.search-facet').on('click.searchFacet', '.search-facet__header, .coveo-facet-header', function (e) {
      var element = e.delegateTarget,
          isCollapsed = $(element).hasClass(component.collapsedClass);

      // Close any other open facets.
      component.closeAll({$except: $(element)});

      // Using Coveo JS Framework.
      // Related: https://coveo.github.io/search-ui/components/facet.html#expand
      if (element.CoveoFacet) {
        if (isCollapsed) {
          element.CoveoFacet.expand();
        }
        else {
          element.CoveoFacet.collapse();
        }
      }
      // Otherwise, just use the class.
      else {
        $(element).toggleClass(component.collapsedClass)
      }

    });

    // Stop propagation of clicks upward to the document to prevent closing.
    $('.search-facet').on('click.searchFacet', function (e) {
      e.stopPropagation();
    });
  };

  /**
   * Closes all open CoveoFacet components.
   *
   * @param {Object} options
   *   options.$except  Exclude a given jQuery selection — uses .not()
   */
  component.closeAll = function (options) {
    var $closeFacets = $('.search-facet');

    if (options && options.$except) {
      $closeFacets = $closeFacets.not(options.$except);
    }

    $closeFacets.each(function () {
      // Using Coveo JS Framework.
      // Related: https://coveo.github.io/search-ui/components/facet.html#collapse
      if (this.CoveoFacet) {
        this.CoveoFacet.collapse();
      }
      // Otherwise, just use the class.
      else {
        $(this).addClass(component.collapsedClass);
      }
    });
  };

})(Components.searchFacet, jQuery);

// Attach our DOM-ready callback.
jQuery(Components.searchFacet.ready);
;
/** 
 * Search Highlight utility.
 *
 * Searches through a list of items and highlights items that match the term.
 */
(function($){
  $(document).ready(function(){
    var $searches = $('.search-highlight input[type="search"]');
    
    if ($searches.length) {
      $searches.each(function(index, el) {
        var $search = $(el),
            $content = $('#' + $search.data('content')),
            highlightClass = $search.data('highlight-class') + " search-highlight__match",
            $contentItems = $content.find('li');

        $search.on('change paste keyup search', function(e) {
          var term = $(this).val().toLowerCase();
          $contentItems.each(function(index, item) {
            var text = $(item).text().toLowerCase();
            $(item).removeClass(highlightClass);
            if (term.length > 0 && text.indexOf(term) > -1) {
              $(item).addClass(highlightClass);
            }
          });
        });

      });
    }
  });
})(jQuery);
