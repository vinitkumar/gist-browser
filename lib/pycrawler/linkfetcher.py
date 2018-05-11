"""Linkfetcher Class."""
#! /usr/bin/env python
from BeautifulSoup import BeautifulSoup
from cgi import escape
import sys
import urllib2
import urlparse

__version__ = "0.0.1"
Agent = "%s/%s" % (__name__, __version__)


class Linkfetcher(object):

    """Link Fetcher class to abstract the link fetching."""

    def __init__(self, url):
        """ init function to intiate url and urls array."""
        self.url = url
        self.urls = []

    def _addHeaders(self, request):
        request.add_header("User-Agent", Agent)

    def __getitem__(self, x):
        """Get item."""
        return self.urls[x]

    def open(self):
        """Open the URL with urllib2."""
        url = self.url
        try:
            request = urllib2.Request(url)
            handle = urllib2.build_opener()
        except IOError:
            return None
        return (request, handle)

    def linkfetch(self):
        """Linkfetch function to actually fetch links."""
        request, handle = self.open()
        self._addHeaders(request)
        if handle:
            try:
                content = unicode(handle.open(request).read(), "utf-8",
                                  errors="replace")
                soup = BeautifulSoup(content)
                tags = soup('a')
            except urllib2.HTTPError, error:

                if error.code == 404:
                    print >> sys.stderr, "ERROR: %s -> %s" % (error, error.url)
                else:
                    print >> sys.stderr, "ERROR: %s" % error
                tags = []

            except urllib2.URLError, error:
                print >> sys.stderr, "ERROR: %s" % error
                tags = []
            for tag in tags:
                href = tag.get("href")
                if href is not None:
                    url = urlparse.urljoin(self.url, escape(href))
                    if url not in self:
                        self.urls.append(url)
