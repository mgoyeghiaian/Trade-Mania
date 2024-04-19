// Continue from the previous example in MatchedUsersComponent

ngOnInit() {
  this.realtimeService.getUpdates('new-match').subscribe((match) => {
    console.log('New Match:', match);
    // Update your match list here
  });

  this.realtimeService.getUpdates('online-status-changed').subscribe((status) => {
    console.log('Online Status Changed:', status);
    // Update your user's online status here
  });

  this.realtimeService.getUpdates('matches-updated').subscribe((matches) => {
    console.log('Matches Updated:', matches);
    // Update your matches view here
  });
}
