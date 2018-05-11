""" Main class for Crawler."""
#! /usr/bin/env python
import time
import optparse
from linkfetcher import Linkfetcher
from webcrawler import Webcrawler

Usage = '''
 $ ./crawler -d5 <url>
    Here in this case it goes till depth of 5 and url is target URL to
    start crawling.
'''
Version = '0.0.1'


def option_parser():
    """Option Parser to give various options."""
    parser = optparse.OptionParser(usage=Usage, version=Version)

    parser.add_option("-l", "--links", action="store_true",
                      default=False, dest="links", help="links for target url")

    parser.add_option("-d", "--depth", action="store", type="int",
                      default=30, dest="depth", help="Maximum depth traverse")
    opts, args = parser.parse_args()

    if len(args) < 1:
        parser.print_help()
        raise SystemExit(1)

    return opts, args


def getlinks(url):
    """Get Links from the Linkfetcher class."""
    page = Linkfetcher(url)
    page.linkfetch()
    for i, url in enumerate(page):
        print "%d ==> %s" % (i, url)


def main():
    """ Main class."""
    opts, args = option_parser()
    url = args[0]

    if opts.links:
        getlinks(url)
        raise SystemExit(0)

    depth = opts.depth

    sTime = time.time()

    print "CRAWLER STARTED:"
    print "%s, will crawl upto depth %d" % (url, depth)
    print "==============================================================="
    webcrawler = Webcrawler(url, depth)
    webcrawler.crawl()
    print "\n".join(webcrawler.urls)

    eTime = time.time()
    tTime = eTime - sTime
    print "\n"
    print "Crawler Statistics"
    print "=================="
    print "No of links Found: %d" % webcrawler.links
    print "No of follwed:     %d" % webcrawler.followed
    print "Time Stats : Found all links  after %0.2fs" % tTime


if __name__ == "__main__":
    main()
