alter table achievements
    add column type varchar(32) not null default 'EXPERIENCE'
        check (type in ('EXPERIENCE', 'SPECIAL'));