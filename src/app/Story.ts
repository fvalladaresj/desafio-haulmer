/*
Formato noticias:
    id	        The item's unique id.
    by	        The username of the item's author.
    time	    Creation date of the item, in Unix Time.
    text	    The comment, story or poll text. HTML.
    url	        The URL of the story.
    score	    The story's score, or the votes for a pollopt.
    title	    The title of the story, poll or job. HTML.
    descendants	In the case of stories or polls, the total comment count.
*/

export interface Story {
    id: number;
    by: string;
    time: number;
    text: string;
    url: string;
    score: number;
    title: string;
    descendants: number;
}