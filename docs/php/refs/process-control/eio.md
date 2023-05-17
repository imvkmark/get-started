# 进程控制扩展 - Eio

Eio函数,本函数提供异步 POSIX I/O 接口

## 安装

[win] 本函数在win平台不可用

## 函数

eio_busy — Artificially increase load. Could be useful in tests, benchmarking.
eio_cancel — Cancels a request
eio_chmod — Change file/direcrory permissions.
eio_chown — Change file/direcrory permissions.
eio_close — Close file
eio_custom — Execute custom request like any other eio_* call.
eio_dup2 — Duplicate a file descriptor
eio_event_loop — Polls libeio until all requests proceeded
eio_fallocate — Allows the caller to directly manipulate the allocated disk space for a file
eio_fchmod — Change file permissions.
eio_fchown — Change file ownership
eio_fdatasync — Synchronize a file’s in-core state with storage device.
eio_fstat — Get file status
eio_fstatvfs — Get file system statistics
eio_fsync — Synchronize a file’s in-core state with storage device
eio_ftruncate — Truncate a file
eio_futime — Change file last access and modification times
eio_get_event_stream — Get stream representing a variable used in internal communications with libeio.
eio_grp_add — Adds a request to the request group.
eio_grp_cancel — Cancels a request group
eio_grp_limit — Set group limit
eio_grp — Createsa request group.
eio_link — Create a hardlink for file
eio_lstat — Get file status
eio_mkdir — Create directory
eio_mknod — Create a special or ordinary file.
eio_nop — Does nothing, except go through the whole request cycle.
eio_npending — Returns number of finished, but unhandled requests
eio_nready — Returns number of not-yet handled requests
eio_nreqs — Returns number of requests to be processed
eio_nthreads — Returns number of threads currently in use
eio_open — Opens a file
eio_poll — Can be to be called whenever there are pending requests that need finishing.
eio_read — Read from a file descriptor at given offset.
eio_readahead — Perform file readahead into page cache
eio_readdir — Reads through a whole directory
eio_readlink — Read value of a symbolic link.
eio_realpath — Get the canonicalized absolute pathname.
eio_rename — Change the name or location of a file.
eio_rmdir — Remove a directory
eio_sendfile — Transfer data between file descriptors
eio_set_max_idle — Set maximum number of idle threads.
eio_set_max_parallel — Set maximum parallel threads
eio_set_max_poll_reqs — Set maximum number of requests processed in a poll.
eio_set_max_poll_time — Set maximum poll time
eio_set_min_parallel — Set minimum parallel thread number
eio_stat — Get file status
eio_statvfs — Get file system statistics
eio_symlink — Create a symbolic link
eio_sync_file_range — Sync a file segment with disk
eio_sync — Commit buffer cache to disk
eio_syncfs — Calls Linux’ syncfs syscall, if available
eio_truncate — Truncate a file
eio_unlink — Delete a name and possibly the file it refers to
eio_utime — Change file last access and modification times.
eio_write — Write to file