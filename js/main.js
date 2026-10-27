(function () {
  "use strict";

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };

  // Parallax
  var parallax = function () {
    $(window).stellar();
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 100,
                "easeInOutExpo"
              );
            });
          }, 50);
        }
      },
      { offset: "85%" }
    );
  };

  var goToTop = function () {
    $(".js-gotop").on("click", function (event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("html").offset().top,
        },
        500,
        "easeInOutExpo"
      );

      return false;
    });

    $(window).scroll(function () {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $(".js-top").addClass("active");
      } else {
        $(".js-top").removeClass("active");
      }
    });
  };

  // Smooth scroll for in-page links (nav, hero and "Get in Touch" buttons)
  var scrollLinks = function () {
    $(".js-scroll").on("click", function (event) {
      var target = $($(this).attr("href"));
      if (!target.length) return;
      event.preventDefault();
      var navHeight = $(".js-site-nav").outerHeight() || 0;
      var top = target.is("#fh5co-header") ? 0 : target.offset().top - navHeight + 1;
      $(".js-site-nav").removeClass("open");
      $(".js-nav-toggle").attr("aria-expanded", "false");
      $("html, body").animate({ scrollTop: top }, 700, "easeInOutExpo");
    });
  };

  // Sticky navigation: solid background after the hero, mobile menu, active section
  var siteNav = function () {
    var $nav = $(".js-site-nav");
    if (!$nav.length) return;
    var $links = $nav.find(".site-nav-links a");

    $(".js-nav-toggle").on("click", function () {
      var open = $nav.toggleClass("open").hasClass("open");
      $(this).attr("aria-expanded", open ? "true" : "false");
    });

    var update = function () {
      var scrollTop = $(window).scrollTop();
      $nav.toggleClass("scrolled", scrollTop > 60);

      var marker = scrollTop + $nav.outerHeight() + 40;
      var current = null;
      $links.each(function () {
        var $section = $($(this).attr("href"));
        if ($section.length && $section.offset().top <= marker) {
          current = this;
        }
      });
      if (scrollTop + $(window).height() >= $(document).height() - 2) {
        current = $links.last()[0];
      }
      $links.removeClass("active");
      if (current) $(current).addClass("active");
    };

    $(window).on("scroll resize", update);
    update();
  };

  // Loading page
  var loaderPage = function () {
    $(".fh5co-loader").fadeOut("slow");
  };

  $(function () {
    contentWayPoint();
    goToTop();
    loaderPage();
    fullHeight();
    parallax();
    scrollLinks();
    siteNav();
  });
})();
