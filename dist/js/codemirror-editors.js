function markHint(){var e=[],r=0,o=0,t=editor_js.getValue(),n=esprima.tokenize(t,{range:!0}),i=[].slice.call(arguments).map(function(e){return null===e?{canBeAnything:!0}:("string"==typeof e&&(e={value:e}),e)}),a=function(e,r){return e.canBeAnything?!0:"value"in e?r.value===e.value:"type"in e?r.type==e.type:void 0};n.forEach(function(t,n){var l=i[r];a(l,t)?(r++,l.highlight&&e.push(t),i.length==r&&(e.forEach(function(e){var r=editor_js.posFromIndex(e.range[0]),t=editor_js.posFromIndex(e.range[1]);0==o++&&editor_js.scrollIntoView(r),editor_js.markText(r,t,{className:"js-hint"})}),r=0)):(r=0,e=[])})}function readOnlyToken(){var e=[],r=0,o=0,t=editor_js.getValue(),n=esprima.tokenize(t,{range:!0}),i=[].slice.call(arguments).map(function(e){return null===e?{canBeAnything:!0}:("string"==typeof e&&(e={value:e}),e)}),a=function(e,r){return e.canBeAnything?!0:"value"in e?r.value===e.value:"type"in e?r.type==e.type:void 0};n.forEach(function(t,n){var l=i[r];a(l,t)?(r++,l.highlight&&e.push(t),i.length==r&&(e.forEach(function(e){var r=editor_js.posFromIndex(e.range[0]),t=editor_js.posFromIndex(e.range[1]);0==o++&&editor_js.scrollIntoView(r),editor_js.markText(r,t,{className:"js-read-only",readOnly:!0})}),r=0)):(r=0,e=[])})}function markJsErrorAtLine(e){var r={line:e-1,ch:0};editor_js.markText(r,{line:e,ch:0},{className:"js-error",clearOnEnter:!0}),editor_js.scrollIntoView(r)}function refreshPreview(){if(console.log("Refreshing view"),!CustomErrors.test()){var e=editor_js.getValue();if("undefined"!=typeof esprima)try{esprima.parse(e)}catch(r){if(r.lineNumber)return markJsErrorAtLine(r.lineNumber),$("#errorModal p.error-text").text(r.description+" at line "+r.lineNumber),void $("#errorModal").foundation("reveal","open")}try{console.log("Eval js"),console.log(e),preview.eval(e+"//# sourceURL=user-level.js"),preview.remove(),preview.p5PlayRebind(),preview.eval("new p5();")}catch(o){StackTrace.fromError(o,{offline:!0,filter:function(e){return/user-level\.js/.test(e.fileName)}}).then(function(e){e.length&&markJsErrorAtLine(e[0].lineNumber)}),console.log("ERROR"),console.log(o),$("#errorModal p.error-text").text(o),$("#errorModal").foundation("reveal","open")}}}function insertEditoTooltip(e,r,o){$("body").prepend('<span id="editor-tooltip" data-tooltip class="has-tip" title="'+e+'"></span>'),editor_js.addWidget({ch:o,line:r-1},$("#editor-tooltip")[0],!0),$(document).foundation("tooltip","reflow"),Foundation.libs.tooltip.showTip($("#editor-tooltip"))}var originalEditorContent="",editor_js=CodeMirror($("#js_editor")[0],{lineNumbers:!0,lineWrapping:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],mode:"javascript"});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2NvZGVtaXJyb3ItZWRpdG9ycy5qcyJdLCJuYW1lcyI6WyJtYXJrSGludCIsImNhbmRpZGF0ZU1hcmtzIiwiY2FuZGlkYXRlSW5kZXgiLCJudW1IaWdobGlnaHRzIiwiY29kZSIsImVkaXRvcl9qcyIsImdldFZhbHVlIiwidG9rZW5zIiwiZXNwcmltYSIsInRva2VuaXplIiwicmFuZ2UiLCJwYXR0ZXJuIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwibWFwIiwiYXJnIiwiY2FuQmVBbnl0aGluZyIsInZhbHVlIiwicGF0dGVyblBhcnRNYXRjaGVzIiwicGF0dGVyblBhcnQiLCJ0b2tlbiIsInR5cGUiLCJmb3JFYWNoIiwiaSIsImhpZ2hsaWdodCIsInB1c2giLCJsZW5ndGgiLCJzdGFydCIsInBvc0Zyb21JbmRleCIsImVuZCIsInNjcm9sbEludG9WaWV3IiwibWFya1RleHQiLCJjbGFzc05hbWUiLCJyZWFkT25seVRva2VuIiwicmVhZE9ubHkiLCJtYXJrSnNFcnJvckF0TGluZSIsImxpbmUiLCJjaCIsImNsZWFyT25FbnRlciIsInJlZnJlc2hQcmV2aWV3IiwiY29uc29sZSIsImxvZyIsIkN1c3RvbUVycm9ycyIsInRlc3QiLCJqc19jb250ZW50IiwicGFyc2UiLCJlIiwibGluZU51bWJlciIsIiQiLCJ0ZXh0IiwiZGVzY3JpcHRpb24iLCJmb3VuZGF0aW9uIiwicHJldmlldyIsImV2YWwiLCJyZW1vdmUiLCJwNVBsYXlSZWJpbmQiLCJlcnIiLCJTdGFja1RyYWNlIiwiZnJvbUVycm9yIiwib2ZmbGluZSIsImZpbHRlciIsInN0YWNrRnJhbWUiLCJmaWxlTmFtZSIsInRoZW4iLCJmcmFtZXMiLCJpbnNlcnRFZGl0b1Rvb2x0aXAiLCJwcmVwZW5kIiwiYWRkV2lkZ2V0IiwiZG9jdW1lbnQiLCJGb3VuZGF0aW9uIiwibGlicyIsInRvb2x0aXAiLCJzaG93VGlwIiwib3JpZ2luYWxFZGl0b3JDb250ZW50IiwiQ29kZU1pcnJvciIsImxpbmVOdW1i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YyxZQUFjSixFQUFFQyxnQkFDcEVDLEdBQUUsZUFBZUcsV0FBVyxTQUFVLFFBUTVDLElBQ0dYLFFBQVFDLElBQUksV0FDWkQsUUFBUUMsSUFBSUcsR0FFYlEsUUFBUUMsS0FBS1QsRUFBYSwrQkFDMUJRLFFBQVFFLFNBQ1JGLFFBQVFHLGVBQ1JILFFBQVFDLEtBQUssYUFDYixNQUFPRyxHQUNQQyxXQUFXQyxVQUFVRixHQUNuQkcsU0FBUyxFQUNUQyxPQUFRLFNBQVNDLEdBQ2YsTUFBTyxpQkFBaUJsQixLQUFLa0IsRUFBV0MsYUFFekNDLEtBQUssU0FBU0MsR0FDWEEsRUFBT3RDLFFBQ1RTLGtCQUFrQjZCLEVBQU8sR0FBR2pCLGNBSTlCUCxRQUFRQyxJQUFJLFNBQ1pELFFBQVFDLElBQUllLEdBRVpSLEVBQUUsNEJBQTRCQyxLQUFNTyxHQUNwQ1IsRUFBRSxlQUFlRyxXQUFXLFNBQVUsVUFLNUMsUUFBU2Msb0JBQW1CaEIsRUFBTWIsRUFBTUMsR0FRdENXLEVBQUUsUUFBUWtCLFFBQVEsaUVBQWlFakIsRUFBSyxhQUd4RjdDLFVBQVUrRCxXQUFXOUIsR0FBSUEsRUFBS0QsS0FBTUEsRUFBSyxHQUFJWSxFQUFFLG1CQUFtQixJQUFJLEdBRXRFQSxFQUFFb0IsVUFBVWpCLFdBQVcsVUFBVyxVQUNsQ2tCLFdBQVdDLEtBQUtDLFFBQVFDLFFBQVN4QixFQUFFLG9CQXhOckMsR0FBSXlCLHVCQUF3QixHQUV4QnJFLFVBQVlzRSxXQUFXMUIsRUFBRSxjQUFjLElBQ3pDMkIsYUFBYSxFQUNiQyxjQUFjLEVBQ2RDLFlBQVksRUFDWkMsU0FBVSx5QkFBMEIseUJBQ3BDQyxLQUFNIiwiZmlsZSI6ImpzL2NvZGVtaXJyb3ItZWRpdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBvcmlnaW5hbEVkaXRvckNvbnRlbnQgPSAnJztcblxudmFyIGVkaXRvcl9qcyA9IENvZGVNaXJyb3IoJCgnI2pzX2VkaXRvcicpWzBdLCB7XG4gIGxpbmVOdW1iZXJzOiB0cnVlLFxuICBsaW5lV3JhcHBpbmc6IHRydWUsXG4gIGZvbGRHdXR0ZXI6IHRydWUsXG4gIGd1dHRlcnM6IFtcIkNvZGVNaXJyb3ItbGluZW51bWJlcnNcIiwgXCJDb2RlTWlycm9yLWZvbGRndXR0ZXJcIl0sXG4gIG1vZGU6ICdqYXZhc2NyaXB0JyxcbiAgLy8gdGhlbWUgOiAnbW9ub2thaSdcbn0pO1xuXG4vLyBlZGl0b3JfanMub24oJ2NoYW5nZXMnLCBmdW5jdGlvbigpIHtcbi8vICAgaWYgKGVkaXRvcl9qcy5nZXRWYWx1ZSgpID09PSBvcmlnaW5hbEVkaXRvckNvbnRlbnQpIHtcbi8vICAgICAkKFwiI3JldmVydFwiKS5oaWRlKCk7XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgJChcIiNyZXZlcnRcIikuc2hvdygpO1xuLy8gICB9XG4vLyB9KTtcblxuZnVuY3Rpb24gbWFya0hpbnQoLyogZXNwcmltYSB0b2tlbiBtYXRjaCBwYXR0ZXJuIC4uLiAqLykge1xuICB2YXIgY2FuZGlkYXRlTWFya3MgPSBbXTtcbiAgdmFyIGNhbmRpZGF0ZUluZGV4ID0gMDtcbiAgdmFyIG51bUhpZ2hsaWdodHMgPSAwO1xuICB2YXIgY29kZSA9IGVkaXRvcl9qcy5nZXRWYWx1ZSgpO1xuXG4gIC8vIEZvciBndWlkYW5jZSBvbiB3aGF0IHRoaXMgbWlnaHQgbG9vayBsaWtlIGluIHByYWN0aWNlLCBwbGF5IGFyb3VuZFxuICAvLyB3aXRoIGh0dHA6Ly9lc3ByaW1hLm9yZy9kZW1vL3BhcnNlLmh0bWwgYW5kIHNlbGVjdCB0aGUgXCJUb2tlbnNcIiB0YWIuXG4gIHZhciB0b2tlbnMgPSBlc3ByaW1hLnRva2VuaXplKGNvZGUsIHtyYW5nZTogdHJ1ZX0pO1xuXG4gIHZhciBwYXR0ZXJuID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLm1hcChmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAoYXJnID09PSBudWxsKSByZXR1cm4ge2NhbkJlQW55dGhpbmc6IHRydWV9O1xuICAgIGlmICh0eXBlb2YoYXJnKSA9PSAnc3RyaW5nJykge1xuICAgICAgYXJnID0ge3ZhbHVlOiBhcmd9O1xuICAgIH1cbiAgICByZXR1cm4gYXJnO1xuICB9KTtcbiAgdmFyIHBhdHRlcm5QYXJ0TWF0Y2hlcyA9IGZ1bmN0aW9uKHBhdHRlcm5QYXJ0LCB0b2tlbikge1xuICAgIGlmIChwYXR0ZXJuUGFydC5jYW5CZUFueXRoaW5nKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoJ3ZhbHVlJyBpbiBwYXR0ZXJuUGFydCkge1xuICAgICAgcmV0dXJuIHRva2VuLnZhbHVlID09PSBwYXR0ZXJuUGFydC52YWx1ZTtcbiAgICB9XG4gICAgaWYgKCd0eXBlJyBpbiBwYXR0ZXJuUGFydCkge1xuICAgICAgcmV0dXJuIHRva2VuLnR5cGUgPT0gcGF0dGVyblBhcnQudHlwZTtcbiAgICB9XG4gIH07XG5cbiAgdG9rZW5zLmZvckVhY2goZnVuY3Rpb24odG9rZW4sIGkpIHtcbiAgICB2YXIgcGF0dGVyblBhcnQgPSBwYXR0ZXJuW2NhbmRpZGF0ZUluZGV4XTtcblxuICAgIGlmIChwYXR0ZXJuUGFydE1hdGNoZXMocGF0dGVyblBhcnQsIHRva2VuKSkge1xuICAgICAgY2FuZGlkYXRlSW5kZXgrKztcbiAgICAgIGlmIChwYXR0ZXJuUGFydC5oaWdobGlnaHQpIHtcbiAgICAgICAgY2FuZGlkYXRlTWFya3MucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBpZiAocGF0dGVybi5sZW5ndGggPT0gY2FuZGlkYXRlSW5kZXgpIHtcbiAgICAgICAgY2FuZGlkYXRlTWFya3MuZm9yRWFjaChmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgIHZhciBzdGFydCA9IGVkaXRvcl9qcy5wb3NGcm9tSW5kZXgodG9rZW4ucmFuZ2VbMF0pO1xuICAgICAgICAgIHZhciBlbmQgPSBlZGl0b3JfanMucG9zRnJvbUluZGV4KHRva2VuLnJhbmdlWzFdKTtcblxuICAgICAgICAgIGlmIChudW1IaWdobGlnaHRzKysgPT0gMCkge1xuICAgICAgICAgICAgZWRpdG9yX2pzLnNjcm9sbEludG9WaWV3KHN0YXJ0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWRpdG9yX2pzLm1hcmtUZXh0KHN0YXJ0LCBlbmQsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzLWhpbnQnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYW5kaWRhdGVJbmRleCA9IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbmRpZGF0ZUluZGV4ID0gMDtcbiAgICAgIGNhbmRpZGF0ZU1hcmtzID0gW107XG4gICAgfVxuICB9KTtcbn1cblxuLy8gTWFrZSBpbmxpbmUgY2hhcnMgcmVhZG9ubHlcbi8vIFJldXNpbmcgbWFya0hpbnRcbmZ1bmN0aW9uIHJlYWRPbmx5VG9rZW4oLyogZXNwcmltYSB0b2tlbiBtYXRjaCBwYXR0ZXJuIC4uLiAqLykge1xuICB2YXIgY2FuZGlkYXRlTWFya3MgPSBbXTtcbiAgdmFyIGNhbmRpZGF0ZUluZGV4ID0gMDtcbiAgdmFyIG51bUhpZ2hsaWdodHMgPSAwO1xuICB2YXIgY29kZSA9IGVkaXRvcl9qcy5nZXRWYWx1ZSgpO1xuXG5cblxuICAvLyBGb3IgZ3VpZGFuY2Ugb24gd2hhdCB0aGlzIG1pZ2h0IGxvb2sgbGlrZSBpbiBwcmFjdGljZSwgcGxheSBhcm91bmRcbiAgLy8gd2l0aCBodHRwOi8vZXNwcmltYS5vcmcvZGVtby9wYXJzZS5odG1sIGFuZCBzZWxlY3QgdGhlIFwiVG9rZW5zXCIgdGFiLlxuICB2YXIgdG9rZW5zID0gZXNwcmltYS50b2tlbml6ZShjb2RlLCB7cmFuZ2U6IHRydWV9KTtcblxuICB2YXIgcGF0dGVybiA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5tYXAoZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKGFyZyA9PT0gbnVsbCkgcmV0dXJuIHtjYW5CZUFueXRoaW5nOiB0cnVlfTtcbiAgICBpZiAodHlwZW9mKGFyZykgPT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZyA9IHt2YWx1ZTogYXJnfTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZztcbiAgfSk7XG4gIHZhciBwYXR0ZXJuUGFydE1hdGNoZXMgPSBmdW5jdGlvbihwYXR0ZXJuUGFydCwgdG9rZW4pIHtcbiAgICBpZiAocGF0dGVyblBhcnQuY2FuQmVBbnl0aGluZykgcmV0dXJuIHRydWU7XG4gICAgaWYgKCd2YWx1ZScgaW4gcGF0dGVyblBhcnQpIHtcbiAgICAgIHJldHVybiB0b2tlbi52YWx1ZSA9PT0gcGF0dGVyblBhcnQudmFsdWU7XG4gICAgfVxuICAgIGlmICgndHlwZScgaW4gcGF0dGVyblBhcnQpIHtcbiAgICAgIHJldHVybiB0b2tlbi50eXBlID09IHBhdHRlcm5QYXJ0LnR5cGU7XG4gICAgfVxuICB9O1xuXG4gIHRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uKHRva2VuLCBpKSB7XG4gICAgdmFyIHBhdHRlcm5QYXJ0ID0gcGF0dGVybltjYW5kaWRhdGVJbmRleF07XG5cbiAgICBpZiAocGF0dGVyblBhcnRNYXRjaGVzKHBhdHRlcm5QYXJ0LCB0b2tlbikpIHtcbiAgICAgIGNhbmRpZGF0ZUluZGV4Kys7XG4gICAgICBpZiAocGF0dGVyblBhcnQuaGlnaGxpZ2h0KSB7XG4gICAgICAgIGNhbmRpZGF0ZU1hcmtzLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09IGNhbmRpZGF0ZUluZGV4KSB7XG4gICAgICAgIGNhbmRpZGF0ZU1hcmtzLmZvckVhY2goZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICB2YXIgc3RhcnQgPSBlZGl0b3JfanMucG9zRnJvbUluZGV4KHRva2VuLnJhbmdlWzBdKTtcbiAgICAgICAgICB2YXIgZW5kID0gZWRpdG9yX2pzLnBvc0Zyb21JbmRleCh0b2tlbi5yYW5nZVsxXSk7XG5cbiAgICAgICAgICBpZiAobnVtSGlnaGxpZ2h0cysrID09IDApIHtcbiAgICAgICAgICAgIGVkaXRvcl9qcy5zY3JvbGxJbnRvVmlldyhzdGFydCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVkaXRvcl9qcy5tYXJrVGV4dChzdGFydCwgZW5kLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdqcy1yZWFkLW9ubHknLFxuICAgICAgICAgICAgcmVhZE9ubHk6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbmRpZGF0ZUluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FuZGlkYXRlSW5kZXggPSAwO1xuICAgICAgY2FuZGlkYXRlTWFya3MgPSBbXTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYXJrSnNFcnJvckF0TGluZShsaW5lKSB7XG4gIHZhciBzdGFydCA9IHtsaW5lOiBsaW5lIC0gMSwgY2g6IDB9O1xuICBlZGl0b3JfanMubWFya1RleHQoc3RhcnQsIHtsaW5lOiBsaW5lLCBjaDogMH0sIHtcbiAgICBjbGFzc05hbWU6ICdqcy1lcnJvcicsXG4gICAgY2xlYXJPbkVudGVyOiB0cnVlXG4gIH0pO1xuICBlZGl0b3JfanMuc2Nyb2xsSW50b1ZpZXcoc3RhcnQpO1xufVxuXG5mdW5jdGlvbiByZWZyZXNoUHJldmlldygpIHtcbiAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIHZpZXdcIik7XG5cbiAgLy8gVGVzdCBmb3IgY3VzdG9tIGZlZWRiYWNrIGZpcnN0IGFuZCBleGl0IGlmIGZvdW5kLiBcbiAgLy8gRXJyb3JzIHdpbGwgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLlxuICBpZiggQ3VzdG9tRXJyb3JzLnRlc3QoKSApIHJldHVybjtcblxuICAvLyBFcnJvciBmZWVkYmFjayBmYWxsYmFja1xuICAvLyBUT0RPOiBDdXJyZW50bHkgY2F0Y2hpbmcgZXJyb3JzIHdpdGggZXNwcmltYSBhbmQgZXZhbC5cbiAgdmFyIGpzX2NvbnRlbnQgPSBlZGl0b3JfanMuZ2V0VmFsdWUoKTtcblxuICBpZiAodHlwZW9mKGVzcHJpbWEpICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRyeSB7XG4gICAgICBlc3ByaW1hLnBhcnNlKGpzX2NvbnRlbnQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLmxpbmVOdW1iZXIpIHtcbiAgICAgICAgbWFya0pzRXJyb3JBdExpbmUoZS5saW5lTnVtYmVyKTtcblxuICAgICAgICAvLyBhbGVydChlLmRlc2NyaXB0aW9uICsgXCIgYXQgbGluZSBcIiArIGUubGluZU51bWJlcik7XG4gICAgICAgICQoJyNlcnJvck1vZGFsIHAuZXJyb3ItdGV4dCcpLnRleHQoIGUuZGVzY3JpcHRpb24gKyBcIiBhdCBsaW5lIFwiICsgZS5saW5lTnVtYmVyICk7XG4gICAgICAgICQoJyNlcnJvck1vZGFsJykuZm91bmRhdGlvbigncmV2ZWFsJywgJ29wZW4nKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9FcnJvciBjaGVja2luZyAocHJvdmlkZSB1c2VyIGZlZWRiYWNrKVxuICB0cnkge1xuICAgICBjb25zb2xlLmxvZyhcIkV2YWwganNcIik7XG4gICAgIGNvbnNvbGUubG9nKGpzX2NvbnRlbnQpO1xuICAgICAgLy9FdmFsIHRoZSBjb2RlIHRvIG92ZXJ3cml0ZSBleGlzdGluZyBmdW5jdGlvbi4gQWNjZXNzIHRoZSBpZnJhbWUgYnkgbmFtZVxuICAgIHByZXZpZXcuZXZhbChqc19jb250ZW50ICsgJy8vIyBzb3VyY2VVUkw9dXNlci1sZXZlbC5qcycpO1xuICAgIHByZXZpZXcucmVtb3ZlKCk7XG4gICAgcHJldmlldy5wNVBsYXlSZWJpbmQoKTtcbiAgICBwcmV2aWV3LmV2YWwoXCJuZXcgcDUoKTtcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIFN0YWNrVHJhY2UuZnJvbUVycm9yKGVyciwge1xuICAgICAgb2ZmbGluZTogdHJ1ZSxcbiAgICAgIGZpbHRlcjogZnVuY3Rpb24oc3RhY2tGcmFtZSkge1xuICAgICAgICByZXR1cm4gL3VzZXItbGV2ZWxcXC5qcy8udGVzdChzdGFja0ZyYW1lLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uKGZyYW1lcykge1xuICAgICAgaWYgKGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgbWFya0pzRXJyb3JBdExpbmUoZnJhbWVzWzBdLmxpbmVOdW1iZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICAgLy8gUmVmZXJlbmNlRXJyb3I6IGFscGggaXMgbm90IGRlZmluZWRcbiAgICAgIGNvbnNvbGUubG9nKFwiRVJST1JcIik7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgXG4gICAgICAkKCcjZXJyb3JNb2RhbCBwLmVycm9yLXRleHQnKS50ZXh0KCBlcnIgKTtcbiAgICAgICQoJyNlcnJvck1vZGFsJykuZm91bmRhdGlvbigncmV2ZWFsJywgJ29wZW4nKTtcbiAgICAgIC8vIGFsZXJ0KFwiTWFrZSBzdXJlIHlvdSd2ZSBkZWZpbmVkIHlvdXIgdmFyaWFibGUgYmVmb3JlIHRyeWluZyB0byB1c2UgaXRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0RWRpdG9Ub29sdGlwKHRleHQsIGxpbmUsIGNoKXtcbiAgLy8gKioqKiBFWEFNUExFIFVTRSAqKioqKjpcbiAgLy8gRURJVE9SOiBpbnNlcnRUb29sdGlwKFwiTGluZXMgdGhhdCBiZWdpbiB3aXRoICcvLycgYXJlIGNvbW1lbnRzIGFuZCBjYW4ndCBiZSByZWFkIGJ5IHRoZSBjb21wdXRlci5cIiwgNCwgMCk7XG4gIFxuICAvLyBDcmVhdGUgYSBuZXcgdG9vbHRpcFxuICAvLyBVcGRhdGluZyB0aGUgdGl0bGUgcHJvcGVydHkgb2YgdGhlIHRvb2x0aXAgaXMgcHJvYmxlbWF0aWMgYWZ0ZXIgZm91bmRhdGlvbixcbiAgLy8gc28gd2UgY3JlYXRlIGEgbmV3IG9uZSBldmVyeSB0aW1lLiBXZSBhbHNvIGRlbGV0ZSB0aGUgdG9vbHRpcCB3aGVuIGl0cyBjbGlja2VkIHRvIGNsb3NlLlxuICAvLyBUT09EOiBJbXByb3ZlIHRvIGhhdmUgYSBzaW5nbGUgdG9vbHRpcD9cbiAgJCgnYm9keScpLnByZXBlbmQoJzxzcGFuIGlkPVwiZWRpdG9yLXRvb2x0aXBcIiBkYXRhLXRvb2x0aXAgY2xhc3M9XCJoYXMtdGlwXCIgdGl0bGU9XCInK3RleHQrJ1wiPjwvc3Bhbj4nKTtcbiAgXG4gIC8vIFdpZGdldCBnZXRzIGluc2VydGVkIG9uZSBsaW5lIGJlbG93LiBVc2UgbGluZSAtIDEgdG8gYWNjb3VudCBmb3IgdGhpc1xuICBlZGl0b3JfanMuYWRkV2lkZ2V0KHtjaDogY2ggLCBsaW5lOiBsaW5lLTF9LCAkKCcjZWRpdG9yLXRvb2x0aXAnKVswXSwgdHJ1ZSk7XG5cbiAgJChkb2N1bWVudCkuZm91bmRhdGlvbigndG9vbHRpcCcsICdyZWZsb3cnKTtcbiAgRm91bmRhdGlvbi5saWJzLnRvb2x0aXAuc2hvd1RpcCggJCgnI2VkaXRvci10b29sdGlwJykgKTtcblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
