
//[1,2,3,4,5,...,8]
export const generatePaginationNumbers = (currentPage: number, totalPages:number) => {

    //if the total number of pages is less than 7, we return an array of numbers from 1 to totalPages
    //we are going to show all the pages without the '...'
    if (totalPages < 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    //if the actual page is between the three first pages
    //show the three first, ..., and last two
    if(currentPage <= 3){
        return [1,2,3,'...', totalPages - 1, totalPages]; // [1,2,3, '...', 49, 50]
    }

    //if the actual page is between the last three pages
    //show the first two, ..., and last three
    if(currentPage >= totalPages - 2){
        return[1,2,'...', totalPages - 2, totalPages - 1, totalPages]; // [1,2, '...', 48, 49, 50]
    }

    //if the actual page is in the middle
    //show the first page, ..., actual page and neighbors
return[
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages]
}