// JXO plugin (20.04.2020)
;(function( $ ) {
	'use strict';

	$.fn.jxo = function(options) {
		var settings = $.extend({}, $.fn.jxo.defaultOptions, options);

		var $jxo = this;

		return $jxo.each(function() {
			if ($(this).data('jxo')) {
				return;
			}
			init();
			$(this).data('jxo', 'jxo');
		});


		function init() {
			initForms($(document), false);
			initPopup($(document));
		};
		
		function initForms(root, renderCaptcha) {
			//debugger
			var forms = root.find("form.jxo-form");
			
			forms.find('.jxo-form__step').hide();
			forms.find('.jxo-form__step-form').show();

			forms.find('input,textarea,select').focus(function() {
				$(this).removeClass('jxo-error');
				if(settings.inputGroupSelector) {
					var $group = $(this).closest(settings.inputGroupSelector);
					$group.removeClass(settings.inputGroupErrorClass);
					if(settings.inputErrorMessageSelector) {
						$group.find(settings.inputErrorMessageSelector).html('');
					}
				}
			});

			if(renderCaptcha && (typeof recaptchav2SiteKey != undefined)) {
				forms.find('.captcha-item').each(function(index) {
					window.grecaptcha.render($(this).attr('id'), {
						'sitekey' : recaptchav2SiteKey
					});
				});
			}

			forms.ajaxForm({
				dataType: 'json',
				data: {
					currentUrl: window.document.location.href
				},
				beforeSubmit: function(data, jqForm, options){
					jqForm.find('button,input[type="submit"]').prop('disabled', true);
					jqForm.find('input,textarea,select,.captcha-item-wrapper').removeClass('jxo-error');

					if(settings.inputGroupSelector) {
						var $group = jqForm.find('input,textarea,select').closest(settings.inputGroupSelector);
						$group.removeClass(settings.inputGroupErrorClass);
						if(settings.inputErrorMessageSelector) {
							$group.find(settings.inputErrorMessageSelector).html('');
						}
					}
				},
				success: function(data, status, xhr, jqForm){
					//jqForm.find('[placeholder]').blur();
					if(data.success){
						// success
						jqForm.find('.jxo-form__step-form').hide();
						jqForm.find('.jxo-form__step-success').show();
						if(jqForm.data('goal')) {
							reachGoal(jqForm.data('goal'));
						}
					}
					else {
						// errors
						for (var field in data.errors) {
							if(field == "recaptchav2_error") {
								jqForm.find('.captcha-item-wrapper').addClass('jxo-error');
							}
							else {
								jqForm.find('[name="' + field + '"]').addClass('jxo-error');
								if(settings.inputGroupSelector) {
									var $group = jqForm.find('[name="' + field + '"]').closest(settings.inputGroupSelector);
									$group.addClass(settings.inputGroupErrorClass);
									if(settings.inputErrorMessageSelector) {
										$group.find(settings.inputErrorMessageSelector).html(data.errors[field].message);
									}
								}
							}
						}
					}
					jqForm.find('button,input[type="submit"]').prop('disabled', false);
				}
			});
		};

		function initPopup() {
			$( "body" ).append('<div id="jxo-popup"></div>');

			$(settings.jsPopupSelector).bind('click', function() {
				var popup = $(this).data('popup');
				var popupDefaults = $(this).data('popup-defaults');

				var requestUrl = settings.FormUrl.replace("{form}", popup);

				$('#jxo-popup').bPopup({
					loadUrl: requestUrl,
					closeClass: settings.popupCloseClass,
					modalColor: settings.popupModalColor,
					opacity: settings.popupModalOpacity,
					loadCallback: function(){
						var $wrapper = this;
						initForms($wrapper, true);
						// устанавливаем поля по-умолчанию
						if(popupDefaults) {
							popupDefaults = $.parseParams(popupDefaults);
							$.each(popupDefaults, function(key, val) {
								$wrapper.find('[name="' + key + '"]').val(val);
							});
						}
						// Здесь можно добавить произвольный код, который сработает после загрузки формы
					}
				});

				return false;
			}); 
		}

		function parseParams(query) {
			var re = /([^&=]+)=?([^&]*)/g;
			var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
			var decode = function (str) {return decodeURIComponent( str.replace(decodeRE, " ") );};
			var params = {}, e;
			while ( e = re.exec(query) ) { 
				var k = decode( e[1] ), v = decode( e[2] );
				if (k.substring(k.length - 2) === '[]') {
					k = k.substring(0, k.length - 2);
					(params[k] || (params[k] = [])).push(v);
				}
				else params[k] = v;
			}
			return params;
		}

		function reachGoal(target) {
			
			// НОВАЯ ВЕРСИЯ СЧЕТЧИКОВ
			//ym(XXXXXX, 'reachGoal', target);
			//ga('send', 'event', 'Forms', target);
			
			// СТАРАЯ ВЕРСИЯ
			//yaCounterXXXXXX.reachGoal(target);
			//gtag('event', target);

			// DEBUG
			// alert(target);
		}
	};

	$.fn.jxo.defaultOptions = {
		jsPopupSelector: '.js-jxo-popup',

		FormUrl: '/forms/{form}',

		popupModalColor: '#000000',
		popupModalOpacity: 0.7,
		popupCloseClass: 'js-jxo-close',

		inputGroupSelector: '',
		inputGroupErrorClass: 'has-error',
		inputErrorMessageSelector: ''
	};
})(jQuery);
