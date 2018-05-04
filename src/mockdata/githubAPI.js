const githubData = [
    { 
        url: 'https://api.github.com/gists/305b416c70db1c2d16061730b495d259',
        forks_url: 'https://api.github.com/gists/305b416c70db1c2d16061730b495d259/forks',
        commits_url: 'https://api.github.com/gists/305b416c70db1c2d16061730b495d259/commits',
        id: '305b416c70db1c2d16061730b495d259',
        git_pull_url: 'https://gist.github.com/305b416c70db1c2d16061730b495d259.git',
        git_push_url: 'https://gist.github.com/305b416c70db1c2d16061730b495d259.git',
        html_url: 'https://gist.github.com/305b416c70db1c2d16061730b495d259',
        files: { 'lx-kernel-panic.md': [Object] },
        public: true,
        created_at: '2018-05-04T14:01:29Z',
        updated_at: '2018-05-04T14:01:29Z',
        description: '32-bit linux binary makes kernel panic on  joyent_20180426T014228Z  ',
        comments: 0,
        user: null,
        comments_url: 'https://api.github.com/gists/305b416c70db1c2d16061730b495d259/comments',
        owner:
            { 
                login: 'cneira',
                id: 4327541,
                avatar_url: 'https://avatars0.githubusercontent.com/u/4327541?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/cneira',
                html_url: 'https://github.com/cneira',
                followers_url: 'https://api.github.com/users/cneira/followers',
                following_url: 'https://api.github.com/users/cneira/following{/other_user}',
                gists_url: 'https://api.github.com/users/cneira/gists{/gist_id}',
                starred_url: 'https://api.github.com/users/cneira/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/cneira/subscriptions',
                organizations_url: 'https://api.github.com/users/cneira/orgs',
                repos_url: 'https://api.github.com/users/cneira/repos',
                events_url: 'https://api.github.com/users/cneira/events{/privacy}',
                received_events_url: 'https://api.github.com/users/cneira/received_events',
                type: 'User',
                site_admin: false 
            },
        truncated: false 
    },
    { 
        url: 'https://api.github.com/gists/5ac00c89c803c751fdb756b5b2f4746d',
        forks_url: 'https://api.github.com/gists/5ac00c89c803c751fdb756b5b2f4746d/forks',
        commits_url: 'https://api.github.com/gists/5ac00c89c803c751fdb756b5b2f4746d/commits',
        id: '5ac00c89c803c751fdb756b5b2f4746d',
        git_pull_url: 'https://gist.github.com/5ac00c89c803c751fdb756b5b2f4746d.git',
        git_push_url: 'https://gist.github.com/5ac00c89c803c751fdb756b5b2f4746d.git',
        html_url: 'https://gist.github.com/5ac00c89c803c751fdb756b5b2f4746d',
        files: { 'proc_lib_spawn.erl': [Object] },
        public: true,
        created_at: '2018-05-04T14:01:19Z',
        updated_at: '2018-05-04T14:01:19Z',
        description: '',
        comments: 0,
        user: null,
        comments_url: 'https://api.github.com/gists/5ac00c89c803c751fdb756b5b2f4746d/comments',
        owner:
            { 
                login: 'koolquark',
                id: 33547591,
                avatar_url: 'https://avatars3.githubusercontent.com/u/33547591?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/koolquark',
                html_url: 'https://github.com/koolquark',
                followers_url: 'https://api.github.com/users/koolquark/followers',
                following_url: 'https://api.github.com/users/koolquark/following{/other_user}',
                gists_url: 'https://api.github.com/users/koolquark/gists{/gist_id}',
                starred_url: 'https://api.github.com/users/koolquark/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/koolquark/subscriptions',
                organizations_url: 'https://api.github.com/users/koolquark/orgs',
                repos_url: 'https://api.github.com/users/koolquark/repos',
                events_url: 'https://api.github.com/users/koolquark/events{/privacy}',
                received_events_url: 'https://api.github.com/users/koolquark/received_events',
                type: 'User',
                site_admin: false 
            },
        truncated: false } 
    ];


export default async => {
    return await new Promise(resolve => {
        resolve(githubData);
    });
};