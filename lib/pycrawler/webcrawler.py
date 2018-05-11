""" Webcrawler module."""
#! /usr/bin/env python
import re
from traceback import format_exc
import urlparse
from linkfetcher import Linkfetcher
from Queue import Queue, Empty as QueueEmpty


class Webcrawler(object):

    """Webcrawler class that contains the crawling logic."""

    def __init__(self, root, depth, locked=True):
        """ initialize variables."""
        self.root = root
        self.depth = depth
        self.locked = locked
        self.links = 0
        self.followed = 0
        self.urls = []
        self.host = urlparse.urlparse(root)[1]

    def crawl(self):
        """crawl function to return list of crawled urls."""
        page = Linkfetcher(self.root)
        page.linkfetch()
        queue = Queue()
        for url in page.urls:
            queue.put(url)
        followed = [self.root]

        n = 0

        while True:
            try:
                url = queue.get()
            except QueueEmpty:
                break

            n += 1

            if url not in followed:
                try:

                    host = urlparse.urlparse(url)[1]

                    if self.locked and re.match(".*%s" % self.host, host):
                        followed.append(url)
                        self.followed += 1
                        page = Linkfetcher(url)
                        page.linkfetch()
                        for i, url in enumerate(page):
                            if url not in self.urls:
                                self.links += 1
                                queue.put(url)
                                self.urls.append(url)

                        if n > self.depth and self.depth > 0:
                            break
                except Exception, e:
                    print "ERROR: The URL '%s' can't be crawled (%s)" % (url, e)
                    print format_exc()
