/**
 *
 编写一个程序，通过填充空格来解决数独问题。

数独的解法需 遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
数独部分空格内已填入了数字，空白格用 '.' 表示。

示例：
输入：board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
输出：[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
解释：输入的数独如上图所示，唯一有效的解决方案如下所示：


提示：

board.length == 9
board[i].length == 9
board[i][j] 是一位数字或者 '.'
题目数据 保证 输入数独仅有一个解
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 var solveSudoku = function(board) {
    const row = new Array(9).fill(0).map(()=> new Set()  )
    const col = new Array(9).fill(0).map(()=> new Set() )
    const cicle = new Array(3).fill(0).map(()=> new Array(3).fill(0).map(()=> new Set() ) )
    for(let i = 0 ;i < 9 ;i ++ ){
        for(let j = 0;j < 9; j++ ){
            if(board[i][j] !== '.' ){
                const cur = board[i][j] * 1
                row[i].add(cur)
                col[j].add(cur)
                cicle[ Math.floor(i / 3) ][ Math.floor(j / 3) ].add(cur)
            }
        }
    }
    let result = false
    const back=(level)=>{
        if(level === 82){
            return result = true
        }
        /* 根据层级  */
        const i = Math.ceil(level / 9) - 1
        const j =  level %  9 - 1 < 0 ? 8 : level %  9 - 1
        if( board[i][j] !== '.') return back(level+1)
        for(let n= 1;n <= 9 ;n++ ){
            if(!result &&!row[i].has(n) && !col[j].has(n) && !cicle[ Math.floor(i / 3) ][ Math.floor(j / 3) ].has(n)  ){
                row[i].add(n)
                col[j].add(n)
                board[i][j] = String(n)
                cicle[ Math.floor(i / 3) ][ Math.floor(j / 3) ].add(n)
                back(level+1)
                if(result) return
                board[i][j] = '.'
                row[i].delete(n)
                col[j].delete(n)
                cicle[ Math.floor(i / 3) ][ Math.floor(j / 3) ].delete(n)
            }
        }
        // console.log(i,j)

    }

    back(1)

};

console.log(
   solveSudoku([['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']])
)

