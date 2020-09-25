import React from "react";

function About() {
  return (
    <div>
      <p>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970. It is a
        zero-player game, meaning that its evolution is determined by its
        initial state, requiring no further input. One interacts with the Game
        of Life by creating an initial configuration and observing how it
        evolves. It is Turing complete and can simulate a universal constructor
        or any other Turing machine. <br></br> <br></br>Since its publication,
        the Game of Life has attracted much interest because of the surprising
        ways in which the patterns can evolve. It provides an example of
        emergence and self-organization. Scholars in various fields, such as
        computer science, physics, biology, biochemistry, economics,
        mathematics, philosophy, and generative sciences, have made use of the
        way that complex patterns can emerge from the implementation of the
        game's simple rules. <br></br> <br></br>The universe of the Game of Life
        is an infinite, two-dimensional orthogonal grid of square cells, each of
        which is in one of two possible states, live or dead, (or populated and
        unpopulated, respectively). Every cell interacts with its eight
        neighbours, which are the cells that are horizontally, vertically, or
        diagonally adjacent. At each step in time, the following transitions
        occur:
        <ol>
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.{" "}
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.{" "}
          </li>
          <li>
            Any dead cell with exactlythree live neighbours becomes a live cell,
            as if by reproduction.{" "}
          </li>
        </ol>
      </p>
      <p id="wiki">
        {" "}
        via{" "}
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
          Wikipedia
        </a>
      </p>
    </div>
  );
}

export default About;
