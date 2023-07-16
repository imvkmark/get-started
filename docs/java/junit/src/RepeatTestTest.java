package junit;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.RepetitionInfo;
import org.junit.jupiter.api.TestInfo;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RepeatTestTest
{

    // #region simple
    @RepeatedTest(10)
    public void repeat()
    {
        assertEquals(3 + 5, 8);
    }
    // #endregion simple

    // #region long
    @RepeatedTest(value = 1, name = RepeatedTest.LONG_DISPLAY_NAME)
    @DisplayName("Details...")
    public void longDisplayName(TestInfo testInfo)
    {
        assertEquals(testInfo.getDisplayName(), "Details... :: repetition 1 of 1");
    }
    // #endregion long

    // #region custom
    @RepeatedTest(value = 1, name = "{displayName} {currentRepetition}/{totalRepetitions}")
    @DisplayName("Repeat!")
    public void customDisplayName(TestInfo testInfo)
    {
        assertEquals(testInfo.getDisplayName(), "Repeat! 1/1");
    }
    // #endregion custom


    // #region repetition
    @RepeatedTest(5)
    public void withRepetitionInfo(RepetitionInfo repetitionInfo)
    {
        assertEquals(5, repetitionInfo.getTotalRepetitions());
    }
    // #endregion repetition
}
