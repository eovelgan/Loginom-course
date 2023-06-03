export function loadXlsxFromBuffer(buffer) {

	const blob = new Blob([buffer], { type: 'application/xlsx' });
	const blobURL = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = blobURL;
	link.download = `loginom_course_file_${new Date()}.xlsx`;
	link.dispatchEvent(new MouseEvent('click'));
	link.remove();
}