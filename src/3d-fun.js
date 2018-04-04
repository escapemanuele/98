(function(){
	var cleanup;

	disable3D = function(){
		if(cleanup){
			cleanup();
			cleanup = null;
		}
		$(".window").css({
			transform: ""
		});
	};

	enable3D = function(){
		disable3D();
		var animate = function(){
			var rAF_ID = requestAnimationFrame(animate);
			cleanup = function(){
				cancelAnimationFrame(rAF_ID);
			};
			$(".window").each(function(){
				var $window = $(this);
				//var offset = $window.offset();//position();
				var el = this;
				var offsetLeft = 0;
				var offsetTop = 0;
				do{
					offsetLeft += el.offsetLeft;
					offsetTop += el.offsetTop;
					el = el.offsetParent;
				}while(el);

				$window.css({
					transform: `perspective(4000px) rotateY(${
						-(offsetLeft + (this.clientWidth - innerWidth) / 2) / innerWidth / 3
					}turn) rotateX(${
						(offsetTop + (this.clientHeight - innerHeight) / 2) / innerHeight / 3
					}turn)`,
					transformOrigin: "50% 50%"
				});
			});
		};
		animate();
	};

	toggle3D = function(){
		if(cleanup){
			disable3D();
		}else{
			enable3D();
		}
	};

	addEventListener("keydown", Konami.code(toggle3D));
}());
