/**
 * Utility functions for the application.
 * **/

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: '#DB5A42',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}