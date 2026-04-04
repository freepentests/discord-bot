const MIME_TYPES = {
	html: 'text/html',
	htm: 'text/html',
	shtml: 'text/html',
	css: 'text/css',
	js: 'application/javascript',
	json: 'application/json',
	xml: 'application/xml',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	gif: 'image/gif',
	bmp: 'image/bmp',
	svg: 'image/svg+xml',
	ico: 'image/x-icon',
	tiff: 'image/tiff',
	ttf: 'font/ttf',
	woff: 'font/woff',
	woff2: 'font/woff2',
	eot: 'application/vnd.ms-fontobject',
	otf: 'font/otf',
	mp3: 'audio/mpeg',
	wav: 'audio/wav',
	ogg: 'audio/ogg',
	m4a: 'audio/x-m4a',
	mp4: 'video/mp4',
	avi: 'video/x-msvideo',
	mov: 'video/quicktime',
	wmv: 'video/x-ms-wmv',
	flv: 'video/x-flv',
	webm: 'video/webm',
	zip: 'application/zip',
	tar: 'application/x-tar',
	gz: 'application/gzip',
	bz2: 'application/x-bzip2',
	'7z': 'application/x-7z-compressed',
	rar: 'application/vnd.rar',
	exe: 'application/vnd.microsoft.portable-executable',
	pdf: 'application/pdf',
	doc: 'application/msword',
	docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	xls: 'application/vnd.ms-excel',
	xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	ppt: 'application/vnd.ms-powerpoint',
	pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	rtf: 'application/rtf',
	epub: 'application/epub+zip',
	mobi: 'application/x-mobipocket-ebook',
	csv: 'text/csv',
	txt: 'text/plain',
	md: 'text/markdown',
	sql: 'application/sql',
	yaml: 'application/x-yaml',
	bak: 'application/octet-stream',
	iso: 'application/x-iso9660-image',
	apk: 'application/vnd.android.package-archive',
	dmg: 'application/x-apple-diskimage',
	msi: 'application/x-msdownload'
};

export const getMimeType = (filename) => {
	const splittedFilename = filename.split('.');
	const extension = splittedFilename.slice(-1);
	const mimeType = MIME_TYPES[extension];

	if (mimeType === undefined) return 'application/octet-stream';
	return mimeType;
};

