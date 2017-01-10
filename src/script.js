var randPrize;
var deviation = 0;
var prevPrize = 0;
var totalDeg = 0;
var roundBefore = 12;
var spining = false;
var prize = ["Ant","Money","Lion","Kite","Jar","India","Home","Goose","Fish","Dog","Cat","Bird"];
var nudge = new TimelineMax({repeat:3, yoyo:true});

$("#pinWheel").click(function(event){
	if(!spining){
		spining = true;
		event.preventDefault();
		randPrize = Math.floor((Math.random()*12));
		deviation = 13 - Math.floor((Math.random()*26));
		totalDeg -= (roundBefore * 360) + getPrize() * 30 - deviation;
		prevPrize = randPrize;
		TweenMax.to($('#itemWheel'),9,{
			rotation: (totalDeg), 
			onComplete: function(){
				spining = false;
				renderPrize();
				totalDeg -= deviation;
			}
		},{ ease: Power2.easeOut, y: 0 });
		console.log("c")
		nudge.to($('#arrowWheel'),0.25,{
			rotation: 5})
			.to($('#arrowWheel'),0.25,{
				rotation: 2})
			.to($('#arrowWheel'),0.25,{
				rotation: 3})
			.to($('#arrowWheel'),0.25,{
				rotation: 3})
			.to($('#arrowWheel'),0.25,{
				rotation: 2})
			.to($('#arrowWheel'),0.25,{
				rotation: 0});
	}
});

function getIndex(){
	return $("#itemSelect option:selected").index();
}

$("#itemInput").val(prize[getIndex()]);

$("#itemSelect").change(function(){
	$("#itemInput").val(prize[getIndex()]);
});

$("#btnSubmit").click(function(){
	prize[getIndex()] = $("#itemInput").val();
	var classTarget = ".color"+(getIndex()+1)+" div";
	$(classTarget).html($("#itemInput").val());
	TweenMax.from($(classTarget),0.5,{autoAlpha:0})
	$("#itemInput").val(prize[getIndex()]);
})

function getPrize(){
	if(randPrize >= prevPrize){
		return randPrize - prevPrize;
	}else{
		return (12 - prevPrize) + randPrize;
	}
}

function renderPrize(){
	$("#prizeMessage").html("Your prize is " + prize[randPrize]);
	TweenMax.from($('#prizeMessage'),2,{autoAlpha:0})
}

