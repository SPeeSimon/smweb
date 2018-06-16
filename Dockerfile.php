FROM php:7-fpm-alpine

RUN apk add --update \
		autoconf \
		g++ \
		libtool \
		make \
	&& docker-php-ext-install mbstring \
	&& docker-php-ext-install tokenizer \
	&& docker-php-ext-install iconv \
	&& docker-php-ext-install opcache \
	&& apk add --update icu-dev \
	&& docker-php-ext-install intl \
	&& apk add --update postgresql-dev \
	&& docker-php-ext-install pgsql \
	&& apk del \
		postgresql-libs \
		libsasl \
		db \
	&& docker-php-ext-install sockets \
	&& touch /usr/local/etc/php/bogus.ini \
	&& pear config-set php_ini /usr/local/etc/php/bogus.ini \
	&& pecl config-set php_ini /usr/local/etc/php/bogus.ini \
	&& apk add --update \
		libevent-dev \
	&& pecl install event \
	&& docker-php-ext-enable event \
	&& mv /usr/local/etc/php/conf.d/docker-php-ext-event.ini \
		/usr/local/etc/php/conf.d/docker-php-ext-zz-event.ini \
	&& rm /usr/local/etc/php/bogus.ini

	RUN apk add --update \
		libevent-dev \
	&& docker-php-ext-install phar 

	RUN apk add --update \
		libxml2-dev
	RUN docker-php-ext-install dom
	RUN apk add --update \
		libpng-dev
	RUN docker-php-ext-install gd
	RUN docker-php-ext-install ctype
	RUN docker-php-ext-install xmlwriter
#	RUN docker-php-ext-install xmlreader
	RUN docker-php-ext-install zip
	RUN docker-php-ext-install posix
	RUN docker-php-ext-install json
	RUN docker-php-ext-install fileinfo
	RUN apk add --update \
		libpng-dev gettext-dev curl-dev
	RUN docker-php-ext-install gettext
	RUN docker-php-ext-install curl

	RUN apk del \
		autoconf \
		bash \
		binutils \
		binutils-libs \
		db \
		expat \
		file \
		g++ \
		gcc \
		gdbm \
		gmp \
		isl \
		libatomic \
		libbz2 \
		libc-dev \
		libffi \
		libgcc \
		libgomp \
		libldap \
		libltdl \
		libmagic \
		libsasl \
		libstdc++ \
		libtool \
		m4 \
		make \
		mpc1 \
		mpfr3 \
		musl-dev \
		perl \
		pkgconf \
		pkgconfig \
		python \
		re2c \
		readline \
		sqlite-libs \
		zlib-dev \
         && rm -rf /tmp/* /var/cache/apk/*

COPY ./scenemodels /scenemodels
RUN chown -R root.root /scenemodels
RUN find /scenemodels -type d -not -perm 755 -exec chmod 755 {} \;
RUN find /scenemodels -type f -not -perm 644 -exec chmod 644 {} \;

ENV PGHOST=127.0.0.1
ENV PGPORT=5432
ENV PGDATABASE=scenemodels
ENV PGUSER=flightgear
ENV PGPASSWORD=secret

