/**
* @desc: 筛选字符串去重
* @param {string} text
*/

function filterText(txt) {
	let result = [];
	let noEqual = true;
	let textArr = txt.split(''),
		textArrLen = textArr.length;
	result.push(textArr[0])
	if (txt.length === 1) {
		return result
	}
	for (let i = 0; i < textArrLen; i++) {
		noEqual = true
		for (let j = 0, len = result.length; j < len; j++) {
			if (result[j] === textArr[i]) {
				noEqual = false
				break
			}
		}
		if (noEqual) {
			result.push(textArr[i])
		}
	}
	return result.join('');
}
