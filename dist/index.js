// src/types/global.ts
var Status;
((Status2) => {
  Status2["Alive"] = "\uD83D\uDFE9";
  Status2["Dead"] = "⬛";
})(Status ||= {});
// src/utils/randomUtils.ts
var getRandomBoolean = () => {
  return Math.random() < 0.5;
};

// src/utils/boardUtils.ts
var createBoard = (width, height) => {
  return Array(height).fill(0).map(() => {
    return Array(width).fill(0).map(() => {
      return getRandomBoolean();
    });
  });
};
var countNeighbors = (board, x, y) => {
  let count = 0;
  for (let dx = -1;dx <= 1; dx++) {
    for (let dy = -1;dy <= 1; dy++) {
      if (dx === 0 && dy === 0) {
        continue;
      }
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && ny < board.length && nx < board[0].length && board[ny][nx]) {
        count++;
      }
    }
  }
  return count;
};

// src/gol.ts
class GameOfLife {
  board;
  intervalId;
  generation = 0;
  width = 50;
  height = 15;
  constructor(options) {
    if (options?.board) {
      this.board = options.board;
      this.width = options.board[0].length;
      this.height = options.board.length;
    } else {
      if (!options?.width || !options?.height) {
        throw new Error("Width and height are required if no board is provided");
      }
      this.width = options.width;
      this.height = options.height;
      this.board = createBoard(this.width, this.height);
    }
  }
  next() {
    this.updateBoard();
    this.generation++;
  }
  getGeneration() {
    return this.generation;
  }
  getBoard() {
    return this.board;
  }
  start(ms = 100) {
    this.intervalId = setInterval(() => {
      console.clear();
      this.next();
      this.display();
    }, ms);
  }
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  display() {
    process.stdout.write("\x1B[H");
    for (const row of this.board) {
      const board = row.map((cell) => cell ? "\uD83D\uDFE9" /* Alive */ : "⬛" /* Dead */).join("");
      process.stdout.write(board + `
`);
    }
    process.stdout.write(`Generation: ${this.generation}
`);
  }
  updateBoard() {
    const newBoard = this.board.map((row, y) => {
      return row.map((_, x) => {
        return this.updateCell(x, y);
      });
    });
    this.board = newBoard;
  }
  updateCell(x, y) {
    const neighbors = countNeighbors(this.board, x, y);
    const live = this.board[y][x];
    if (live && (neighbors < 2 || neighbors > 3)) {
      return false;
    }
    if (!live && neighbors === 3) {
      return true;
    }
    return live;
  }
}
export {
  Status,
  GameOfLife
};

//# debugId=48B592B006038D7C64756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3R5cGVzL2dsb2JhbC50cyIsICIuLi9zcmMvdXRpbHMvcmFuZG9tVXRpbHMudHMiLCAiLi4vc3JjL3V0aWxzL2JvYXJkVXRpbHMudHMiLCAiLi4vc3JjL2dvbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJleHBvcnQgdHlwZSBDZWxsID0gYm9vbGVhblxuXG5leHBvcnQgZW51bSBTdGF0dXNcbntcbiAgQWxpdmUgPSAn8J+fqScsXG4gIERlYWQgPSAn4qybJyxcbn1cblxuZXhwb3J0IHR5cGUgQm9hcmQgPSBDZWxsW11bXVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNcbntcbiAgd2lkdGg/OiBudW1iZXJcbiAgaGVpZ2h0PzogbnVtYmVyXG4gIGJvYXJkPzogQm9hcmRcbiAgbXM/OiBudW1iZXJcbiAgc2hvd0dlbmVyYXRpb24/OiBib29sZWFuXG59XG4iLAogICAgImltcG9ydCB0eXBlIHsgQ2VsbCB9IGZyb20gJ0AvdHlwZXMvZ2xvYmFsJ1xuXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tQm9vbGVhbiA9ICgpOiBDZWxsID0+XG57XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41XG59XG4iLAogICAgImltcG9ydCB7IGdldFJhbmRvbUJvb2xlYW4gfSBmcm9tICcuL3JhbmRvbVV0aWxzJ1xuaW1wb3J0IHR5cGUgeyBCb2FyZCB9IGZyb20gJ0AvdHlwZXMvZ2xvYmFsJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQm9hcmQgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBCb2FyZCA9Plxue1xuICByZXR1cm4gQXJyYXkoaGVpZ2h0KS5maWxsKDApLm1hcCgoKSA9PlxuICB7XG4gICAgcmV0dXJuIEFycmF5KHdpZHRoKS5maWxsKDApLm1hcCgoKSA9PlxuICAgIHtcbiAgICAgIHJldHVybiBnZXRSYW5kb21Cb29sZWFuKClcbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgY291bnROZWlnaGJvcnMgPSAoYm9hcmQ6IEJvYXJkLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciA9Plxue1xuICBsZXQgY291bnQgPSAwXG5cbiAgZm9yIChsZXQgZHggPSAtMTsgZHggPD0gMTsgZHgrKylcbiAge1xuICAgIGZvciAobGV0IGR5ID0gLTE7IGR5IDw9IDE7IGR5KyspXG4gICAge1xuICAgICAgaWYgKGR4ID09PSAwICYmIGR5ID09PSAwKVxuICAgICAge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBueCA9IHggKyBkeFxuICAgICAgY29uc3QgbnkgPSB5ICsgZHlcblxuICAgICAgaWYgKG54ID49IDAgJiYgbnkgPj0gMCAmJiBueSA8IGJvYXJkLmxlbmd0aCAmJiBueCA8IGJvYXJkWzBdLmxlbmd0aCAmJiBib2FyZFtueV1bbnhdKVxuICAgICAge1xuICAgICAgICBjb3VudCsrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvdW50XG59XG4iLAogICAgImltcG9ydCB7IHR5cGUgQm9hcmQsIHR5cGUgT3B0aW9ucywgdHlwZSBDZWxsLCBTdGF0dXMgfSBmcm9tICdAL3R5cGVzL2dsb2JhbCdcbmltcG9ydCB7IGNvdW50TmVpZ2hib3JzLCBjcmVhdGVCb2FyZCB9IGZyb20gJ0AvdXRpbHMvYm9hcmRVdGlscydcblxuZXhwb3J0IGNsYXNzIEdhbWVPZkxpZmVcbntcbiAgcHJpdmF0ZSBib2FyZDogQm9hcmRcbiAgcHJpdmF0ZSBpbnRlcnZhbElkPzogVGltZXJcbiAgcHJpdmF0ZSBnZW5lcmF0aW9uOiBudW1iZXIgPSAwXG5cbiAgd2lkdGg6IG51bWJlciA9IDUwXG4gIGhlaWdodDogbnVtYmVyID0gMTVcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogT3B0aW9ucylcbiAge1xuICAgIGlmIChvcHRpb25zPy5ib2FyZClcbiAgICB7XG4gICAgICB0aGlzLmJvYXJkID0gb3B0aW9ucy5ib2FyZFxuICAgICAgdGhpcy53aWR0aCA9IG9wdGlvbnMuYm9hcmRbMF0ubGVuZ3RoXG4gICAgICB0aGlzLmhlaWdodCA9IG9wdGlvbnMuYm9hcmQubGVuZ3RoXG4gICAgfVxuXG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGlmICghb3B0aW9ucz8ud2lkdGggfHwgIW9wdGlvbnM/LmhlaWdodClcbiAgICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaWR0aCBhbmQgaGVpZ2h0IGFyZSByZXF1aXJlZCBpZiBubyBib2FyZCBpcyBwcm92aWRlZCcpXG4gICAgICB9XG5cbiAgICAgIHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoXG4gICAgICB0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0XG4gICAgICB0aGlzLmJvYXJkID0gY3JlYXRlQm9hcmQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBuZXh0IGdlbmVyYXRpb24gb2YgdGhlIGJvYXJkLlxuICAgKi9cbiAgbmV4dCgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLnVwZGF0ZUJvYXJkKClcbiAgICB0aGlzLmdlbmVyYXRpb24rK1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBnZW5lcmF0aW9uIG51bWJlci5cbiAgICovXG4gIGdldEdlbmVyYXRpb24oKTogbnVtYmVyXG4gIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0aW9uXG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IGJvYXJkLlxuICAgKi9cbiAgZ2V0Qm9hcmQoKTogQm9hcmRcbiAge1xuICAgIHJldHVybiB0aGlzLmJvYXJkXG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIGdhbWUgbG9vcC4gRGVmYXVsdCBpbnRlcnZhbCBpcyAxMDBtcy5cbiAgICovXG4gIHN0YXJ0KG1zOiBudW1iZXIgPSAxMDApOiB2b2lkXG4gIHtcbiAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PlxuICAgIHtcbiAgICAgIGNvbnNvbGUuY2xlYXIoKVxuICAgICAgdGhpcy5uZXh0KClcbiAgICAgIHRoaXMuZGlzcGxheSgpXG4gICAgfSwgbXMpXG4gIH1cblxuICAvKipcbiAgICogU3RvcCB0aGUgZ2FtZSBsb29wLlxuICAgKi9cbiAgc3RvcCgpOiB2b2lkXG4gIHtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkKVxuICAgIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5IHRoZSBjdXJyZW50IGJvYXJkLlxuICAgKi9cbiAgZGlzcGxheSgpOiB2b2lkXG4gIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFx4MWJbSCcpXG5cbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmJvYXJkKVxuICAgIHtcbiAgICAgIGNvbnN0IGJvYXJkID0gcm93Lm1hcCgoY2VsbCkgPT4gY2VsbCA/IFN0YXR1cy5BbGl2ZSA6IFN0YXR1cy5EZWFkKS5qb2luKCcnKVxuXG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShib2FyZCArICdcXG4nKVxuICAgIH1cblxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBHZW5lcmF0aW9uOiAke3RoaXMuZ2VuZXJhdGlvbn1cXG5gKVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVCb2FyZCgpOiB2b2lkXG4gIHtcbiAgICBjb25zdCBuZXdCb2FyZCA9IHRoaXMuYm9hcmQubWFwKChyb3csIHkpID0+XG4gICAge1xuICAgICAgcmV0dXJuIHJvdy5tYXAoKF8sIHgpID0+XG4gICAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUNlbGwoeCwgeSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuYm9hcmQgPSBuZXdCb2FyZFxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDZWxsKHg6IG51bWJlciwgeTogbnVtYmVyKTogQ2VsbFxuICB7XG4gICAgY29uc3QgbmVpZ2hib3JzID0gY291bnROZWlnaGJvcnModGhpcy5ib2FyZCwgeCwgeSlcbiAgICBjb25zdCBsaXZlID0gdGhpcy5ib2FyZFt5XVt4XVxuXG4gICAgaWYgKGxpdmUgJiYgKG5laWdoYm9ycyA8IDIgfHwgbmVpZ2hib3JzID4gMykpXG4gICAge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCFsaXZlICYmIG5laWdoYm9ycyA9PT0gMylcbiAgICB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBsaXZlXG4gIH1cbn1cbiIKICBdLAogICJtYXBwaW5ncyI6ICI7QUFFTyxJQUFLO0FBQUwsRUFBSyxZQUFMO0FBRUwscUJBQVE7QUFDUixvQkFBTztBQUFBLEdBSEc7O0FDQUwsSUFBTSxtQkFBbUIsTUFDaEM7QUFDRSxTQUFPLEtBQUssT0FBTyxJQUFJO0FBQUE7OztBQ0RsQixJQUFNLGNBQWMsQ0FBQyxPQUFlLFdBQzNDO0FBQ0UsU0FBTyxNQUFNLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLE1BQ2pDO0FBQ0UsV0FBTyxNQUFNLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLE1BQ2hDO0FBQ0UsYUFBTyxpQkFBaUI7QUFBQSxLQUN6QjtBQUFBLEdBQ0Y7QUFBQTtBQUdJLElBQU0saUJBQWlCLENBQUMsT0FBYyxHQUFXLE1BQ3hEO0FBQ0UsTUFBSSxRQUFRO0FBRVosV0FBUyxLQUFLLEdBQUksTUFBTSxHQUFHLE1BQzNCO0FBQ0UsYUFBUyxLQUFLLEdBQUksTUFBTSxHQUFHLE1BQzNCO0FBQ0UsVUFBSSxPQUFPLEtBQUssT0FBTyxHQUN2QjtBQUNFO0FBQUEsTUFDRjtBQUVBLFlBQU0sS0FBSyxJQUFJO0FBQ2YsWUFBTSxLQUFLLElBQUk7QUFFZixVQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLEdBQUcsVUFBVSxNQUFNLElBQUksS0FDakY7QUFDRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQTs7O0FDbENGLE1BQU0sV0FDYjtBQUFBLEVBQ1U7QUFBQSxFQUNBO0FBQUEsRUFDQSxhQUFxQjtBQUFBLEVBRTdCLFFBQWdCO0FBQUEsRUFDaEIsU0FBaUI7QUFBQSxFQUVqQixXQUFXLENBQUMsU0FDWjtBQUNFLFFBQUksU0FBUyxPQUNiO0FBQ0UsV0FBSyxRQUFRLFFBQVE7QUFDckIsV0FBSyxRQUFRLFFBQVEsTUFBTSxHQUFHO0FBQzlCLFdBQUssU0FBUyxRQUFRLE1BQU07QUFBQSxJQUM5QixPQUdBO0FBQ0UsV0FBSyxTQUFTLFVBQVUsU0FBUyxRQUNqQztBQUNFLGNBQU0sSUFBSSxNQUFNLHVEQUF1RDtBQUFBLE1BQ3pFO0FBRUEsV0FBSyxRQUFRLFFBQVE7QUFDckIsV0FBSyxTQUFTLFFBQVE7QUFDdEIsV0FBSyxRQUFRLFlBQVksS0FBSyxPQUFPLEtBQUssTUFBTTtBQUFBO0FBQUE7QUFBQSxFQU9wRCxJQUFJLEdBQ0o7QUFDRSxTQUFLLFlBQVk7QUFDakIsU0FBSztBQUFBO0FBQUEsRUFNUCxhQUFhLEdBQ2I7QUFDRSxXQUFPLEtBQUs7QUFBQTtBQUFBLEVBTWQsUUFBUSxHQUNSO0FBQ0UsV0FBTyxLQUFLO0FBQUE7QUFBQSxFQU1kLEtBQUssQ0FBQyxLQUFhLEtBQ25CO0FBQ0UsU0FBSyxhQUFhLFlBQVksTUFDOUI7QUFDRSxjQUFRLE1BQU07QUFDZCxXQUFLLEtBQUs7QUFDVixXQUFLLFFBQVE7QUFBQSxPQUNaLEVBQUU7QUFBQTtBQUFBLEVBTVAsSUFBSSxHQUNKO0FBQ0UsUUFBSSxLQUFLLFlBQ1Q7QUFDRSxvQkFBYyxLQUFLLFVBQVU7QUFBQSxJQUMvQjtBQUFBO0FBQUEsRUFNRixPQUFPLEdBQ1A7QUFDRSxZQUFRLE9BQU8sTUFBTSxRQUFRO0FBRTdCLGVBQVcsT0FBTyxLQUFLLE9BQ3ZCO0FBQ0UsWUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsa0RBQWlDLEVBQUUsS0FBSyxFQUFFO0FBRTFFLGNBQVEsT0FBTyxNQUFNLFFBQVE7QUFBQSxDQUFJO0FBQUEsSUFDbkM7QUFFQSxZQUFRLE9BQU8sTUFBTSxlQUFlLEtBQUs7QUFBQSxDQUFjO0FBQUE7QUFBQSxFQUdqRCxXQUFXLEdBQ25CO0FBQ0UsVUFBTSxXQUFXLEtBQUssTUFBTSxJQUFJLENBQUMsS0FBSyxNQUN0QztBQUNFLGFBQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxNQUNuQjtBQUNFLGVBQU8sS0FBSyxXQUFXLEdBQUcsQ0FBQztBQUFBLE9BQzVCO0FBQUEsS0FDRjtBQUVELFNBQUssUUFBUTtBQUFBO0FBQUEsRUFHUCxVQUFVLENBQUMsR0FBVyxHQUM5QjtBQUNFLFVBQU0sWUFBWSxlQUFlLEtBQUssT0FBTyxHQUFHLENBQUM7QUFDakQsVUFBTSxPQUFPLEtBQUssTUFBTSxHQUFHO0FBRTNCLFFBQUksU0FBUyxZQUFZLEtBQUssWUFBWSxJQUMxQztBQUNFLGFBQU87QUFBQSxJQUNUO0FBRUEsU0FBSyxRQUFRLGNBQWMsR0FDM0I7QUFDRSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQTtBQUVYOyIsCiAgImRlYnVnSWQiOiAiNDhCNTkyQjAwNjAzOEQ3QzY0NzU2RTIxNjQ3NTZFMjEiLAogICJuYW1lcyI6IFtdCn0=
