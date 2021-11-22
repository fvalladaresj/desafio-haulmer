import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HackerNewsService } from '../hacker-news.service';
import { Story } from '../Story';

@Component({
  selector: 'app-hacker-news',
  templateUrl: './hacker-news.component.html',
  providers: [HackerNewsService],
  styleUrls: ['./hacker-news.component.css'],
})
export class HackerNewsComponent implements OnInit {
  storiesLoaded: Promise<boolean> | undefined;

  bestStoriesInfo: Story[] = [];

  pageEvent: PageEvent = new PageEvent();
  length: number = 0;
  pageSize: number = 50;
  pageIndex: number = 0;

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(): void {
    this.getServerData();
  }

  getServerData() {
    this.hackerNewsService.getStories().subscribe((story) => {
      this.bestStoriesInfo = story;
      this.length = story.length;
      this.storiesLoaded = Promise.resolve(true);
    });
  }

  handleEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    return event;
  }

  parseHTML(str: string){
    var parser = new DOMParser();
	  var doc = parser.parseFromString(str, 'text/html');
	  return document.write(doc.body.outerHTML);
  }
}
