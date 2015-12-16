function revertMiniCourse(){loadMiniCourse(refreshPreview)}function publishPrompt(){$("#publishModal").foundation("reveal","open")}function undo(){editor_js.undo()}function publish(){console.log("PARENT PUBLISH"),generatedHTML=null,MinicoursePublisher.generateHTML({baseURL:"./mini/",baseLevel:maxLevel,js:editor_js.getValue(),formInfo:'<span id="first_name">'+$("#first_name").val().charAt(0).toUpperCase()+$("#first_name").val().slice(1)+'</span> from <span id="city">'+$("#city").val()+'</span><span id="grade" style="display: none;">'+$("#grade").val()+'</span><span id="school" style="display: none;">'+$("#00NU0000005PN7e").val()+'</span><span id="state" style="display: none;">'+$("#state").val()+'</span><span id="country" style="display: none;">'+$("#country").val()+"</span>"},function(e,n){if(e)return void alert("Error generating published HTML: "+e.message);if(generatedHTML=n,console.log("GENERATED HTML"),console.log(generatedHTML),!generatedHTML)return void alert("There was an error publishing your game. Please try again later!");$("#published").hide(),$("#publishing").fadeIn();var o=window.location.hostname.indexOf("code.globaloria.com")>-1?"http://globaloria.com:8000/":"https://hackpub.herokuapp.com/buckets/globaloria/";$.ajax({type:"POST",url:o+"publish",data:{html:generatedHTML},crossDomain:!0,dataType:"json",error:function(){alert("Error publishing HTML!"),console.log(arguments)},success:function(e){$("#published").fadeIn().find("a").attr("href",e["published-url"]).text(e["published-url"]),$("#publish-form input#retUrl").val(e["published-url"]),$("#00NU0000005PN7t").val(e["published-url"]);var n=[];$("#isStudent").prop("checked")&&n.push($("#isStudent").val()),$("#isTeacher").prop("checked")&&n.push($("#isTeacher").val()),$("#isParent").prop("checked")&&n.push($("#isParent").val()),$("#isAdministrator").prop("checked")&&n.push($("#isAdministrator").val()),$("#00NU0000005Ph2K").val(n.join(",")),$("#publish-form").unbind().submit()},complete:function(){$("#publishing").hide()}})})}function loadMiniCourse(cb){cb=cb||function(){},console.log("Loading mini course template");var zeroPaddedLevel=currentLevel<10?"0"+currentLevel:currentLevel;"true"==window.sessionStorage.skipToSandbox&&(zeroPaddedLevel=maxLevel),$.get("mini/levels/"+zeroPaddedLevel+".js",function(data){var markHints=[],readOnlyTokens=[],readOnlyRanges=[],foldedRanges=[],currLineNumber=0,currIndentation=0,editorTooltips=[],editorCommands={markHint:function(){markHints.push(arguments)},readOnlyToken:function(){readOnlyTokens.push(arguments)},beginReadOnly:function(){readOnlyRanges.push([currLineNumber])},endReadOnly:function(){var e=readOnlyRanges[readOnlyRanges.length-1];e.push(currLineNumber)},beginCodeFold:function(e){foldedRanges.push({begin:currLineNumber,indentation:currIndentation,linkText:e||"More…"})},endCodeFold:function(){var e=foldedRanges[foldedRanges.length-1];e.end=currLineNumber},insertTooltip:function(){editorTooltips.push(arguments)}};console.log("Course retrieved: "),console.log(data),data=data.replace(/\r\n/g,"\n"),data=data.replace(/}\n*$/,"\n\n\n\n\n\n\n\n\n\n}\n"),data=data.split("\n").filter(function(line){var match=line.match(/(\s*)\/\/\s*EDITOR:(.*)/);if(!match)return currLineNumber++,!0;with(currIndentation=match[1],editorCommands)console.log("Executing editor command: "+match[2]),eval(match[2]);return!1}).join("\n"),originalEditorContent=data,editor_js.setValue(data),readOnlyRanges.push([0,1]),readOnlyRanges.push([editor_js.lineCount()-2,editor_js.lineCount()]),readOnlyRanges.forEach(function(e){editor_js.markText({line:e[0],ch:0},{line:e[1],ch:0},{className:"js-read-only",readOnly:!0})}),readOnlyTokens.forEach(function(e){readOnlyToken.apply(this,e)}),markHints.forEach(function(e){markHint.apply(this,e)}),$("#js_editor").removeClass("show-js-hints"),markHints.length?$("#showHints").show():$("#showHints").hide(),foldedRanges.forEach(function(e){var n={line:e.begin,ch:0},o=$('<span class="cm-comment">'+e.indentation+"// </span>");$('<span class="js-code-fold-link"></span>').text(e.linkText).appendTo(o),editor_js.foldCode(n,{widget:o[0],rangeFinder:function(o,t){return{from:n,to:{line:e.end-1,ch:editor_js.getLine(e.end-1).length}}}})}),editorTooltips.forEach(function(e){insertEditoTooltip.apply(this,e)}),cb()}),storage.set("currentLevel",currentLevel),document.getElementById("preview").contentWindow.location.reload()}function showHints(){$("#js_editor").addClass("show-js-hints"),$("#showHints").fadeOut()}function nextLevel(){currentLevel==maxLevel?maxLevel:currentLevel++,loadMiniCourse()}function prevLevel(){1==currentLevel?1:currentLevel--,loadMiniCourse()}var maxLevel=gameConstants.MAX_LEVEL;$(document).ready(function(){storage.set("skipToSandbox",!1),$("main").css("height",window.innerHeight-36),$("#welcomeModal").foundation("reveal","open"),$(document).on("close.fndtn.reveal","#welcomeModal",function(){$(document).foundation("joyride","start",{pre_ride_callback:function(){$("#showHints").css("display","block"),$("#previous").css("display","block"),$("#next").css("display","block")},pre_step_callback:function(){console.log(this.$target.first().attr("id")),"preview"==this.$target.first().attr("id")?$("iframe").contents().find("canvas").addClass("joyride-highlight"):this.$target.first().addClass("joyride-highlight")},post_step_callback:function(){"preview"==this.$target.first().attr("id")?$("iframe").contents().find("canvas").removeClass("joyride-highlight"):this.$target.first().removeClass("joyride-highlight")},post_ride_callback:function(){console.log("JOYRIDE CLOSED"),$("#showHints").css("display","none"),$("#previous").css("display","none"),$("#next").css("display","none")},abort_on_close:!1})}),$(document).on("click",".joyride-close-tip",function(){console.log(this)});var e=0,n=window.location.search.match(/debugLevel=(\d+)/);n&&(e=parseInt(n[1])),window.sessionStorage.currentLevel=e,currentLevel=e,$instructions=$("#instructions"),$(document).on("click","#loginButton",function(e){e.preventDefault(),console.log("login"),console.log(this);var n=document.getElementById("sign_in_email").value,o=document.getElementById("sign_in_password").value;authWithPassword({email:n,password:o},authHandler),$("#signupModal").foundation("reveal","close")}),$(document).on("click","span.tooltip",function(){Foundation.libs.tooltip.hide($("#editor-tooltip")),$(this).remove(),$("#editor-tooltip").remove()}),$(document).on("click","#signupButton",function(e){e.preventDefault(),console.log("signup"),console.log(this);var n=document.getElementById("sign_up_email").value,o=document.getElementById("sign_up_password").value;createUserAndLogin({email:n,password:o}),$("#signupModal").foundation("reveal","close")}),$(document).on("click","#logout",function(e){e.preventDefault(),console.log("logout"),console.log(this),logout()}),loadMiniCourse(),$("iframe#preview").attr("src","mini/index.html").focus(),$("form #00NU0000005PN7j").on("change",function(){console.log($(this).prop("checked")),$(this).prop("checked")?($("#first_name").prop("disabled",!1),$("#email").prop("disabled",!1),$("#phone").prop("disabled",!1)):($("#first_name").val(""),$("#email").val(""),$("#phone").val(""),$("#first_name").prop("disabled",!0),$("#email").prop("disabled",!0),$("#phone").prop("disabled",!0))}),$("#publish-form").submit(function(e){return console.log("VALIDATING"),""==$("#00NU0000005PN7e").val()||""==$("#city").val()||""==$("#country").val()||""==$("#state").val()?(console.log("VALIDATION FAILED"),!1):(console.log("PUBLISHING"),publish(),e.preventDefault(),!1)})});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiXSwibmFtZXMiOlsicmV2ZXJ0TWluaUNvdXJzZSIsImxvYWRNaW5pQ291cnNlIiwicmVmcmVzaFByZXZpZXciLCJwdWJsaXNoUHJvbXB0IiwiJCIsImZvdW5kYXRpb24iLCJ1bmRvIiwiZWRpdG9yX2pzIiwicHVibGlzaCIsImNvbnNvbGUiLCJsb2ciLCJnZW5lcmF0ZWRIVE1MIiwiTWluaWNvdXJzZVB1Ymxpc2hlciIsImdlbmVyYXRlSFRNTCIsImJhc2VVUkwiLCJiYXNlTGV2ZWwiLCJtYXhMZXZlbCIsImpzIiwiZ2V0VmFsdWUiLCJmb3JtSW5mbyIsInZhbCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJlcnIiLCJodG1sIiwiYWxlcnQiLCJtZXNzYWdlIiwiaGlkZSIsImZhZGVJbiIsIndpbmRvdyIsImxvY2F0aW9uIiwiaG9zdG5hbWUiLCJpbmRleE9mIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhIiwiY3Jvc3NEb21haW4iLCJkYXRhVHlwZSIsImVycm9yIiwiYXJndW1lbnRzIiwic3VjY2VzcyIsImZpbmQiLCJhdHRyIiwidGV4dCIsInJvbGUiLCJwcm9wIiwicHVzaCIsImpvaW4iLCJ1bmJpbmQiLCJzdWJtaXQiLCJjb21wbGV0ZSIsImNiIiwiemVyb1BhZGRlZExldmVsIiwiY3VycmVudExldmVsIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXQiLCJtYXJrSGludHMiLCJyZWFkT25seVRva2VucyIsInJlYWRPbmx5UmFuZ2VzIiwiZm9sZGVkUmFuZ2VzIiwiY3VyckxpbmVOdW1iZXIiLCJjdXJySW5kZW50YXRpb24iLCJlZGl0b3JUb29sdGlwcyIsImVkaXRvckNvbW1hbmRzIiwibWFya0hpbnQiLCJyZWFkT25seVRva2VuIiwiYmVnaW5SZWFkT25seSIsImVuZFJlYWRPbmx5IiwiY3VyclJhbmdlIiwibGVuZ3RoIiwiYmVnaW5Db2RlRm9sZCIsImxpbmtUZXh0IiwiYmVnaW4iLCJpbmRlbnRhdGlvbiIsImVuZENvZGVGb2xkIiwiZW5kIiwiaW5zZXJ0VG9vbHRpcCIsInJlcGxhY2UiLCJzcGxpdCIsImZpbHRlciIsImxpbmUiLCJtYXRjaCIsImV2YWwiLCJvcmlnaW5hbEVkaXRvckNvbnRlbnQiLCJzZXRWYWx1ZSIsImxpbmVDb3VudCIsImZvckVhY2giLCJyYW5nZSIsIm1hcmtUZXh0IiwiY2giLCJjbGFzc05hbWUiLCJyZWFkT25seSIsImFwcGx5IiwidGhpcyIsInJlbW92ZUNsYXNzIiwic2hvdyIsInN0YXJ0Iiwic3BhbiIsImFwcGVuZFRvIiwiZm9sZENvZGUiLCJ3aWRnZXQiLCJyYW5nZUZpbmRlciIsImNtIiwicG9zIiwiZnJvbSIsInRvIiwiZ2V0TGluZSIsImluc2VydEVkaXRvVG9vbHRpcCIsInN0b3JhZ2UiLCJzZXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGVudFdpbmRvdyIsInJlbG9hZCIsInNob3dIaW50cyIsImFkZENsYXNzIiwiZmFkZU91dCIsIm5leHRMZXZlbCIsInByZXZMZXZlbCIsImdhbWVDb25zdGFudHMiLCJNQVhfTEVWRUwiLCJyZWFkeSIsImNzcyIsImlubmVySGVpZ2h0Iiwib24iLCJwcmVfcmlkZV9jYWxsYmFjayIsInByZV9zdGVwX2NhbGxiYWNrIiwiJHRhcmdldCIsImZpcnN0IiwiY29udGVudHMiLCJwb3N0X3N0ZXBfY2FsbGJhY2siLCJwb3N0X3JpZGVfY2FsbGJhY2siLCJhYm9ydF9vbl9jbG9zZSIsInN0YXJ0TGV2ZWwiLCJkZWJ1Z0xldmVsIiwic2VhcmNoIiwicGFyc2VJbnQiLCIkaW5zdHJ1Y3Rpb25zIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZW1haWwiLCJ2YWx1ZSIsInBhc3N3b3JkIiwiYXV0aFdpdGhQYXNzd29yZCIsImF1dGhIYW5kbGVyIiwiRm91bmRhdGlvbiIsImxpYnMiLCJ0b29sdGlwIiwicmVtb3ZlIiwiY3JlYXRlVXNlckFuZExvZ2luIiwibG9nb3V0IiwiZm9jdXMiLCJldmVudCJdLCJtYXBwaW5ncyI6IkFBc0tBLFFBQVNB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SUFBSSxzQkFDTCxJQU1YRCxRQUFRQyxJQUFJLGNBQ1pGLFVBQ0FrSixFQUFNYixrQkFDQyIsImZpbGUiOiJqcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1heExldmVsID0gZ2FtZUNvbnN0YW50cy5NQVhfTEVWRUw7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIERvbid0IHN0YXJ0IGluIHNhbmRib3ggaWYgdGhlIHBhZ2UgaXMgcmVmcmVzaGVkXG4gICAgc3RvcmFnZS5zZXQoJ3NraXBUb1NhbmRib3gnLCBmYWxzZSk7XG5cbiAgICAvL1Jlc2l6ZSB0byB2aWV3cG9ydFxuICAgICQoXCJtYWluXCIpLmNzcyhcImhlaWdodFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQtMzYpO1xuXG4gICAgLy9PcGVuIHdlbGNvbWUgbW9kYWwgb24gZmlyc3QgbG9hZFxuICAgICQoJyN3ZWxjb21lTW9kYWwnKS5mb3VuZGF0aW9uKCdyZXZlYWwnLCAnb3BlbicpO1xuXG4gICAgLy8gSW5pdCBqb3lyaWRlIGFmdGVyIFdlbGNvbWUgTW9kYWxcbiAgICAkKGRvY3VtZW50KS5vbignY2xvc2UuZm5kdG4ucmV2ZWFsJywgJyN3ZWxjb21lTW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBcbiAgICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oJ2pveXJpZGUnLCAnc3RhcnQnLCB7XG4gICAgICAgIFxuICAgICAgICBwcmVfcmlkZV9jYWxsYmFjayAgICAgIDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EaXNwbGF5IGFsbCBidXR0b25zIGZvciBqb3lyaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNzaG93SGludHNcIikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwcmV2aW91c1wiKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI25leHRcIikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHByZV9zdGVwX2NhbGxiYWNrICAgICAgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiR0YXJnZXQuZmlyc3QoKS5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLiR0YXJnZXQuZmlyc3QoKS5hdHRyKCdpZCcpID09IFwicHJldmlld1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpZnJhbWVcIikuY29udGVudHMoKS5maW5kKFwiY2FudmFzXCIpLmFkZENsYXNzKFwiam95cmlkZS1oaWdobGlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YXJnZXQuZmlyc3QoKS5hZGRDbGFzcygnam95cmlkZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHBvc3Rfc3RlcF9jYWxsYmFjayAgICAgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLiR0YXJnZXQuZmlyc3QoKS5hdHRyKCdpZCcpID09IFwicHJldmlld1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpZnJhbWVcIikuY29udGVudHMoKS5maW5kKFwiY2FudmFzXCIpLnJlbW92ZUNsYXNzKFwiam95cmlkZS1oaWdobGlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YXJnZXQuZmlyc3QoKS5yZW1vdmVDbGFzcygnam95cmlkZS1oaWdobGlnaHQnKTsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHBvc3RfcmlkZV9jYWxsYmFjayAgICAgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJKT1lSSURFIENMT1NFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRGlzcGxheSBhbGwgYnV0dG9ucyBmb3Igam95cmlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjc2hvd0hpbnRzXCIpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwcmV2aW91c1wiKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbmV4dFwiKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICBhYm9ydF9vbl9jbG9zZSAgICAgICAgICAgOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qb3lyaWRlLWNsb3NlLXRpcCcsIGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICB9KTtcblxuXG5cbiAgICB2YXIgc3RhcnRMZXZlbCA9IDA7XG4gICAgdmFyIGRlYnVnTGV2ZWwgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLm1hdGNoKC9kZWJ1Z0xldmVsPShcXGQrKS8pO1xuXG4gICAgaWYgKGRlYnVnTGV2ZWwpIHtcbiAgICAgICAgc3RhcnRMZXZlbCA9IHBhcnNlSW50KGRlYnVnTGV2ZWxbMV0pO1xuICAgIH1cblxuXG4gICAgLy9SZXNldCBzZXNzaW9uU3RvcmFnZSB0byBrZWVwIGVkaXRvciBhbmQgaWZyYW1lIGluIHN5bmNcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VbJ2N1cnJlbnRMZXZlbCddID0gc3RhcnRMZXZlbDtcblxuICAgIGN1cnJlbnRMZXZlbCA9IHN0YXJ0TGV2ZWw7XG5cbiAgICAkaW5zdHJ1Y3Rpb25zID0gJChcIiNpbnN0cnVjdGlvbnNcIik7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2xvZ2luQnV0dG9uJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9naW5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuXG4gICAgICAgIHZhciBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduX2luX2VtYWlsJykudmFsdWU7XG4gICAgICAgIHZhciBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduX2luX3Bhc3N3b3JkJykudmFsdWU7XG4gICAgICAgIGF1dGhXaXRoUGFzc3dvcmQoe1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0sIGF1dGhIYW5kbGVyKTtcblxuXG5cbiAgICAgICAgJCgnI3NpZ251cE1vZGFsJykuZm91bmRhdGlvbigncmV2ZWFsJywgJ2Nsb3NlJyk7XG4gICAgfSk7XG5cbiAgICAvL1JlbW92ZSB0b29sdGlwcyBmcm9tIGNvZGUgZWRpdG9yXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ3NwYW4udG9vbHRpcCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIEZvdW5kYXRpb24ubGlicy50b29sdGlwLmhpZGUoICQoJyNlZGl0b3ItdG9vbHRpcCcpICk7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICQoJyNlZGl0b3ItdG9vbHRpcCcpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNzaWdudXBCdXR0b24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaWdudXBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25fdXBfZW1haWwnKS52YWx1ZTtcbiAgICAgICAgdmFyIHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25fdXBfcGFzc3dvcmQnKS52YWx1ZTtcblxuICAgICAgICBjcmVhdGVVc2VyQW5kTG9naW4oe1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgICAgICBcblxuICAgICAgICAkKCcjc2lnbnVwTW9kYWwnKS5mb3VuZGF0aW9uKCdyZXZlYWwnLCAnY2xvc2UnKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjbG9nb3V0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9nb3V0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICBsb2dvdXQoKTtcbiAgICB9KTtcblxuICAgIGxvYWRNaW5pQ291cnNlKCk7XG4gICAgLy9TZXQgaWZyYW1lIHRvIHJpZ2h0IGxldmVsXG4gICAgJCgnaWZyYW1lI3ByZXZpZXcnKS5hdHRyKCdzcmMnLCAnbWluaS9pbmRleC5odG1sJykuZm9jdXMoKTtcblxuICAgIC8vIFB1Ymxpc2hpbmcgZm9ybSBzdWJtaXNzaW9uXG4gICAgLy9pcy1hZHVsdFxuICAgICQoJ2Zvcm0gIzAwTlUwMDAwMDA1UE43aicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZyggJCh0aGlzKS5wcm9wKCdjaGVja2VkJykgKTtcbiAgICAgICAgaWYoICQodGhpcykucHJvcCgnY2hlY2tlZCcpICl7XG4gICAgICAgICAgICAkKCcjZmlyc3RfbmFtZScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgLy8gJCgnI2xhc3RfbmFtZScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgJCgnI2VtYWlsJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjcGhvbmUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkKCcjZmlyc3RfbmFtZScpLnZhbCgnJyk7XG4gICAgICAgICAgICAvLyAkKCcjbGFzdF9uYW1lJykudmFsKCcnKTtcbiAgICAgICAgICAgICQoJyNlbWFpbCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAkKCcjcGhvbmUnKS52YWwoJycpO1xuXG4gICAgICAgICAgICAkKCcjZmlyc3RfbmFtZScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAvLyAkKCcjbGFzdF9uYW1lJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICQoJyNlbWFpbCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAkKCcjcGhvbmUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgJCgnI3B1Ymxpc2gtZm9ybScpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZBTElEQVRJTkdcIik7XG4gICAgICAgIC8vIEZvcm0gdmFsaWRhdGlvblxuICAgICAgICBpZiggJCgnIzAwTlUwMDAwMDA1UE43ZScpLnZhbCgpID09IFwiXCJcbiAgICAgICAgICAgIHx8ICQoJyNjaXR5JykudmFsKCkgPT0gXCJcIlxuICAgICAgICAgICAgfHwgJCgnI2NvdW50cnknKS52YWwoKSA9PSBcIlwiXG4gICAgICAgICAgICB8fCAkKCcjc3RhdGUnKS52YWwoKSA9PSBcIlwiXG4gICAgICAgICAgICApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWQUxJREFUSU9OIEZBSUxFRFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXZlbnQgZm9ybSBzdWJtaXNzaW9uXG4gICAgICAgIC8vIFB1Ymxpc2ggZ2FtZSBhbmQgc2V0IHVybCBhcyB0aGUgcmV0dXJuIHBhcmFtZXRlciBmb3IgdGhlIGZvcm0uXG4gICAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybSBmcm9tIHB1Ymxpc2hcbiAgICAgICAgY29uc29sZS5sb2coXCJQVUJMSVNISU5HXCIpO1xuICAgICAgICBwdWJsaXNoKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiByZXZlcnRNaW5pQ291cnNlKCkge1xuICAgIGxvYWRNaW5pQ291cnNlKHJlZnJlc2hQcmV2aWV3KTtcbn1cblxuZnVuY3Rpb24gcHVibGlzaFByb21wdCgpe1xuICAkKCcjcHVibGlzaE1vZGFsJykuZm91bmRhdGlvbigncmV2ZWFsJywgJ29wZW4nKTtcbn1cblxuZnVuY3Rpb24gdW5kbygpe1xuICAgIGVkaXRvcl9qcy51bmRvKCk7XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2goKXtcbiAgY29uc29sZS5sb2coXCJQQVJFTlQgUFVCTElTSFwiKTtcbiAgXG4gIGdlbmVyYXRlZEhUTUwgPSBudWxsO1xuICBNaW5pY291cnNlUHVibGlzaGVyLmdlbmVyYXRlSFRNTCh7XG4gICAgYmFzZVVSTDogJy4vbWluaS8nLFxuICAgIGJhc2VMZXZlbDogbWF4TGV2ZWwsXG4gICAganM6IGVkaXRvcl9qcy5nZXRWYWx1ZSgpLFxuICAgIGZvcm1JbmZvOiAnPHNwYW4gaWQ9XCJmaXJzdF9uYW1lXCI+JysgJCgnI2ZpcnN0X25hbWUnKS52YWwoKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArICQoJyNmaXJzdF9uYW1lJykudmFsKCkuc2xpY2UoMSkgKyc8L3NwYW4+IGZyb20gPHNwYW4gaWQ9XCJjaXR5XCI+JyskKCcjY2l0eScpLnZhbCgpKyc8L3NwYW4+J1xuICAgICAgICAgICAgICArJzxzcGFuIGlkPVwiZ3JhZGVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+JyskKCcjZ3JhZGUnKS52YWwoKSsnPC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8c3BhbiBpZD1cInNjaG9vbFwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4nKyQoJyMwME5VMDAwMDAwNVBON2UnKS52YWwoKSsnPC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8c3BhbiBpZD1cInN0YXRlXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPicrJCgnI3N0YXRlJykudmFsKCkrJzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPHNwYW4gaWQ9XCJjb3VudHJ5XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPicrJCgnI2NvdW50cnknKS52YWwoKSsnPC9zcGFuPidcbiAgfSwgZnVuY3Rpb24oZXJyLCBodG1sKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgYWxlcnQoXCJFcnJvciBnZW5lcmF0aW5nIHB1Ymxpc2hlZCBIVE1MOiBcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgZ2VuZXJhdGVkSFRNTCA9IGh0bWw7XG4gICAgY29uc29sZS5sb2coXCJHRU5FUkFURUQgSFRNTFwiKTtcbiAgICBjb25zb2xlLmxvZyhnZW5lcmF0ZWRIVE1MKTtcblxuICAgIGlmICghZ2VuZXJhdGVkSFRNTCkge1xuICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgcHVibGlzaGluZyB5b3VyIGdhbWUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICAvLyBCZWdpbiBwdWJsaXNoaW5nXG4gICAgJChcIiNwdWJsaXNoZWRcIikuaGlkZSgpO1xuICAgICQoXCIjcHVibGlzaGluZ1wiKS5mYWRlSW4oKTtcblxuICAgIHZhciBiYXNlVVJMID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLmluZGV4T2YoJ2NvZGUuZ2xvYmFsb3JpYS5jb20nKSA+IC0xXG4gICAgICAgICAgICAgICAgICA/ICdodHRwOi8vZ2xvYmFsb3JpYS5jb206ODAwMC8nXG4gICAgICAgICAgICAgICAgICA6ICdodHRwczovL2hhY2twdWIuaGVyb2t1YXBwLmNvbS9idWNrZXRzL2dsb2JhbG9yaWEvJztcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICB1cmw6IGJhc2VVUkwgKyAncHVibGlzaCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgICdodG1sJzogZ2VuZXJhdGVkSFRNTFxuICAgICAgfSxcbiAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYWxlcnQoXCJFcnJvciBwdWJsaXNoaW5nIEhUTUwhXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgJChcIiNwdWJsaXNoZWRcIikuZmFkZUluKClcbiAgICAgICAgICAuZmluZCgnYScpXG4gICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhWydwdWJsaXNoZWQtdXJsJ10pXG4gICAgICAgICAgLnRleHQoZGF0YVsncHVibGlzaGVkLXVybCddKTtcblxuICAgICAgICBcbiAgICAgICAgLy8gUmVwbGFjZSB0aGUgZm9ybSdzIHJldHVybiBVUkwgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAkKCcjcHVibGlzaC1mb3JtIGlucHV0I3JldFVybCcpLnZhbCggZGF0YVsncHVibGlzaGVkLXVybCddICk7XG4gICAgICAgIFxuICAgICAgICAvLyBQb3B1bGF0ZSBnYW1lIGxpbmsgZm9yIHNhbGVzZm9yY2UgY2FwdHVyZVxuICAgICAgICAkKCcjMDBOVTAwMDAwMDVQTjd0JykudmFsKGRhdGFbJ3B1Ymxpc2hlZC11cmwnXSk7XG5cbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIHJvbGUgZmllbGQgZm9yIHNhbGVzZm9yY2VcbiAgICAgICAgdmFyIHJvbGUgPSBbXTtcbiAgICAgICAgaWYoICQoJyNpc1N0dWRlbnQnKS5wcm9wKCdjaGVja2VkJykgKSByb2xlLnB1c2goICQoJyNpc1N0dWRlbnQnKS52YWwoKSApO1xuICAgICAgICBpZiggJCgnI2lzVGVhY2hlcicpLnByb3AoJ2NoZWNrZWQnKSApIHJvbGUucHVzaCggJCgnI2lzVGVhY2hlcicpLnZhbCgpICk7XG4gICAgICAgIGlmKCAkKCcjaXNQYXJlbnQnKS5wcm9wKCdjaGVja2VkJykgKSByb2xlLnB1c2goICQoJyNpc1BhcmVudCcpLnZhbCgpICk7XG4gICAgICAgIGlmKCAkKCcjaXNBZG1pbmlzdHJhdG9yJykucHJvcCgnY2hlY2tlZCcpICkgcm9sZS5wdXNoKCAkKCcjaXNBZG1pbmlzdHJhdG9yJykudmFsKCkgKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICQoJyMwME5VMDAwMDAwNVBoMksnKS52YWwoIHJvbGUuam9pbignLCcpICk7XG5cbiAgICAgICAgLy9VbmJpbmQgZm9ybSB0byBwcmV2ZW50IHN1Ym1pdCBsb29wXG4gICAgICAgICQoJyNwdWJsaXNoLWZvcm0nKS51bmJpbmQoKS5zdWJtaXQoKTtcblxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJChcIiNwdWJsaXNoaW5nXCIpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRNaW5pQ291cnNlKGNiKXtcbiAgICBjYiA9IGNiIHx8IGZ1bmN0aW9uKCkge31cbiAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgbWluaSBjb3Vyc2UgdGVtcGxhdGVcIik7XG4gICAgdmFyIHplcm9QYWRkZWRMZXZlbCA9IChjdXJyZW50TGV2ZWwgPCAxMCkgPyAnMCcgKyBjdXJyZW50TGV2ZWwgOiBjdXJyZW50TGV2ZWw7XG5cbiAgICAvLyBTa2lwIHRvIHNhbmRib3hcbiAgICBpZiggd2luZG93LnNlc3Npb25TdG9yYWdlWydza2lwVG9TYW5kYm94J10gPT0gXCJ0cnVlXCIgKXtcbiAgICAgICAgemVyb1BhZGRlZExldmVsID0gbWF4TGV2ZWw7XG4gICAgfVxuXG4gICAgJC5nZXQoJ21pbmkvbGV2ZWxzLycgKyB6ZXJvUGFkZGVkTGV2ZWwgKyAnLmpzJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgbWFya0hpbnRzID0gW107XG4gICAgICAgIHZhciByZWFkT25seVRva2VucyA9IFtdO1xuICAgICAgICB2YXIgcmVhZE9ubHlSYW5nZXMgPSBbXTtcbiAgICAgICAgdmFyIGZvbGRlZFJhbmdlcyA9IFtdO1xuICAgICAgICB2YXIgY3VyckxpbmVOdW1iZXIgPSAwO1xuICAgICAgICB2YXIgY3VyckluZGVudGF0aW9uID0gMDtcbiAgICAgICAgdmFyIGVkaXRvclRvb2x0aXBzID0gW107XG4gICAgICAgIHZhciBlZGl0b3JDb21tYW5kcyA9IHtcbiAgICAgICAgICAgIG1hcmtIaW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtYXJrSGludHMucHVzaChhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWRPbmx5VG9rZW46IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVhZE9ubHlUb2tlbnMucHVzaChhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZ2luUmVhZE9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlYWRPbmx5UmFuZ2VzLnB1c2goW2N1cnJMaW5lTnVtYmVyXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kUmVhZE9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyUmFuZ2UgPSByZWFkT25seVJhbmdlc1tyZWFkT25seVJhbmdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBjdXJyUmFuZ2UucHVzaChjdXJyTGluZU51bWJlcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVnaW5Db2RlRm9sZDogZnVuY3Rpb24obGlua1RleHQpIHtcbiAgICAgICAgICAgICAgICBmb2xkZWRSYW5nZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luOiBjdXJyTGluZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgaW5kZW50YXRpb246IGN1cnJJbmRlbnRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgbGlua1RleHQ6IGxpbmtUZXh0IHx8ICdNb3JlXFx1MjAyNidcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmRDb2RlRm9sZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJSYW5nZSA9IGZvbGRlZFJhbmdlc1tmb2xkZWRSYW5nZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgY3VyclJhbmdlLmVuZCA9IGN1cnJMaW5lTnVtYmVyO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaW5zZXJ0VG9vbHRpcDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBlZGl0b3JUb29sdGlwcy5wdXNoKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJDb3Vyc2UgcmV0cmlldmVkOiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgIC8vIE5vcm1hbGl6ZSB3aGl0ZXNwYWNlIGlmIHdlJ3JlIG9uIHdpbmRvd3MuXG4gICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJyk7XG5cbiAgICAgICAgLy8gV2Ugd2FudCB0byBtYWtlIGl0IGxlc3MgbGlrZWx5IHRoYXQgdGhlIHVzZXIgYWNjaWRlbnRhbGx5XG4gICAgICAgIC8vIGRlbGV0ZXMgdGhlIGNsb3NpbmcgYnJhY2Ugb2YgYSBmdW5jdGlvbiBkZWZpbml0aW9uIG9yIGFkZHNcbiAgICAgICAgLy8gY29kZSBhZnRlciBpdCwgc28gd2UnbGwgbW92ZSBpdCB3YXkgZG93biB0byB0aGUgYm90dG9tIG9mXG4gICAgICAgIC8vIHRoZSBmaWxlIHdpdGggcGxlbnR5IG9mIHdoaXRlLXNwYWNlIGluIGJldHdlZW4uXG4gICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL31cXG4qJC8sICdcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG59XFxuJyk7XG5cbiAgICAgICAgZGF0YSA9IGRhdGEuc3BsaXQoJ1xcbicpLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC8oXFxzKilcXC9cXC9cXHMqRURJVE9SOiguKikvKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBjdXJyTGluZU51bWJlcisrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJySW5kZW50YXRpb24gPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIHdpdGggKGVkaXRvckNvbW1hbmRzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGVjdXRpbmcgZWRpdG9yIGNvbW1hbmQ6IFwiICsgbWF0Y2hbMl0pO1xuICAgICAgICAgICAgICAgIGV2YWwobWF0Y2hbMl0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuXG4gICAgICAgIG9yaWdpbmFsRWRpdG9yQ29udGVudCA9IGRhdGE7XG4gICAgICAgIGVkaXRvcl9qcy5zZXRWYWx1ZShkYXRhKTtcblxuICAgICAgICAvLyBNYWtlIHRoZSBmaXJzdCBsaW5lIHJlYWQtb25seS5cbiAgICAgICAgcmVhZE9ubHlSYW5nZXMucHVzaChbMCwgMV0pO1xuXG4gICAgICAgIC8vIE1ha2UgdGhlIGxhc3QgdHdvIGxpbmVzIHJlYWQtb25seS5cbiAgICAgICAgcmVhZE9ubHlSYW5nZXMucHVzaChbZWRpdG9yX2pzLmxpbmVDb3VudCgpIC0gMiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcl9qcy5saW5lQ291bnQoKV0pO1xuXG4gICAgICAgIHJlYWRPbmx5UmFuZ2VzLmZvckVhY2goZnVuY3Rpb24ocmFuZ2UpIHtcbiAgICAgICAgICAgIGVkaXRvcl9qcy5tYXJrVGV4dCh7bGluZTogcmFuZ2VbMF0sIGNoOiAwfSwge1xuICAgICAgICAgICAgICBsaW5lOiByYW5nZVsxXSxcbiAgICAgICAgICAgICAgY2g6IDBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnanMtcmVhZC1vbmx5JyxcbiAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVhZE9ubHlUb2tlbnMuZm9yRWFjaChmdW5jdGlvbihhcmd1bWVudHMpIHtcbiAgICAgICAgICAgIHJlYWRPbmx5VG9rZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFya0hpbnRzLmZvckVhY2goZnVuY3Rpb24oYXJndW1lbnRzKSB7XG4gICAgICAgICAgICBtYXJrSGludC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKFwiI2pzX2VkaXRvclwiKS5yZW1vdmVDbGFzcygnc2hvdy1qcy1oaW50cycpO1xuXG4gICAgICAgIGlmIChtYXJrSGludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKFwiI3Nob3dIaW50c1wiKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI3Nob3dIaW50c1wiKS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb2xkZWRSYW5nZXMuZm9yRWFjaChmdW5jdGlvbihyYW5nZSkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0ge2xpbmU6IHJhbmdlLmJlZ2luLCBjaDogMH07XG4gICAgICAgICAgICB2YXIgc3BhbiA9ICQoJzxzcGFuIGNsYXNzPVwiY20tY29tbWVudFwiPicgKyByYW5nZS5pbmRlbnRhdGlvbiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJy8vIDwvc3Bhbj4nKTtcbiAgICAgICAgICAgICQoJzxzcGFuIGNsYXNzPVwianMtY29kZS1mb2xkLWxpbmtcIj48L3NwYW4+JylcbiAgICAgICAgICAgICAgLnRleHQocmFuZ2UubGlua1RleHQpXG4gICAgICAgICAgICAgIC5hcHBlbmRUbyhzcGFuKTtcbiAgICAgICAgICAgIGVkaXRvcl9qcy5mb2xkQ29kZShzdGFydCwge1xuICAgICAgICAgICAgICAgIHdpZGdldDogc3BhblswXSxcbiAgICAgICAgICAgICAgICByYW5nZUZpbmRlcjogZnVuY3Rpb24oY20sIHBvcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHJhbmdlLmVuZCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2g6IGVkaXRvcl9qcy5nZXRMaW5lKHJhbmdlLmVuZCAtIDEpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGl0b3JUb29sdGlwcy5mb3JFYWNoKGZ1bmN0aW9uKGFyZ3VtZW50cyl7XG4gICAgICAgICAgICBpbnNlcnRFZGl0b1Rvb2x0aXAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2IoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBTZXQgc2Vzc2lvbiBzdG9yYWdlIGFuZCByZWxvYWQgdGhlIGlmcmFtZSB0byBiZSBzeW5jaGVkXG4gICAgc3RvcmFnZS5zZXQoJ2N1cnJlbnRMZXZlbCcsIGN1cnJlbnRMZXZlbCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXcnKS5jb250ZW50V2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufVxuXG5mdW5jdGlvbiBzaG93SGludHMoKSB7XG4gICAgJChcIiNqc19lZGl0b3JcIikuYWRkQ2xhc3MoJ3Nob3ctanMtaGludHMnKTtcbiAgICAkKFwiI3Nob3dIaW50c1wiKS5mYWRlT3V0KCk7XG59XG5cbmZ1bmN0aW9uIG5leHRMZXZlbCgpe1xuICAgIGN1cnJlbnRMZXZlbCA9PSBtYXhMZXZlbCA/IG1heExldmVsIDogY3VycmVudExldmVsKys7XG4gICAgXG4gICAgLy9VcGRhdGUgaWZyYW1lIHNvdXJjZVxuICAgIC8vICQoJ2lmcmFtZSNwcmV2aWV3JykuYXR0cignc3JjJywgJ3Byb2plY3RfdGVtcGxhdGUvaW5kZXgnK2N1cnJlbnRMZXZlbCsnLmh0bWwnKTtcbiAgICAvLyAkaW5zdHJ1Y3Rpb25zLmZpbmQoXCJoM1wiKS50ZXh0KGluc3RydWN0aW9uc1tcImxldmVsXCIrY3VycmVudExldmVsXS50aXRsZSk7XG4gICAgLy8gJGluc3RydWN0aW9ucy5maW5kKFwicFwiKS50ZXh0KGluc3RydWN0aW9uc1tcImxldmVsXCIrY3VycmVudExldmVsXS5jb250ZW50KTtcbiAgICBsb2FkTWluaUNvdXJzZSgpO1xufVxuXG5mdW5jdGlvbiBwcmV2TGV2ZWwoKXtcbiAgICBjdXJyZW50TGV2ZWwgPT0gMSA/IDEgOiBjdXJyZW50TGV2ZWwtLTtcbiAgICBcbiAgICAvL1VwZGF0ZSBpZnJhbWUgc291cmNlXG4gICAgLy8gJCgnaWZyYW1lI3ByZXZpZXcnKS5hdHRyKCdzcmMnLCAncHJvamVjdF90ZW1wbGF0ZS9pbmRleCcrY3VycmVudExldmVsKycuaHRtbCcpO1xuICAgIC8vICRpbnN0cnVjdGlvbnMuZmluZChcImgzXCIpLnRleHQoaW5zdHJ1Y3Rpb25zW1wibGV2ZWxcIitjdXJyZW50TGV2ZWxdLnRpdGxlKTtcbiAgICAvLyAkaW5zdHJ1Y3Rpb25zLmZpbmQoXCJwXCIpLnRleHQoaW5zdHJ1Y3Rpb25zW1wibGV2ZWxcIitjdXJyZW50TGV2ZWxdLmNvbnRlbnQpO1xuICAgIGxvYWRNaW5pQ291cnNlKCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
